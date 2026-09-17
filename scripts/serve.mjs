// Private static viewer. Uses built-in Node only and serves only the generated directory.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const option = (name, fallback) => { const index = args.indexOf(name); return index < 0 ? fallback : args[index + 1]; };
const root = fs.realpathSync(option('--root', path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')));
const base = option('--base', '/');
const viewId = option('--view-id', 'EXACT_SITE_RC1_RETURN_R1');
if (!/^\/(?:[a-z0-9-]+\/)*$/.test(base) || !fs.existsSync(path.join(root, 'index.html'))) {
  throw Error('A built site directory and valid base are required.');
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.py': 'text/plain; charset=utf-8',
};
const rangeTypes = new Set(['.pdf', '.json']);
const parseRange = (header, size) => {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (!match[1] && !match[2]) || size <= 0) return false;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return false;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) return false;
    end = Math.min(end, size - 1);
  }
  return { start, end };
};

const server = http.createServer((request, response) => {
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Exact-View', viewId);
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  let requestPath;
  try {
    requestPath = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }
  const missing = () => {
    const body = fs.readFileSync(path.join(root, '404.html'));
    response.writeHead(404, { 'Content-Type': types['.html'], 'Content-Length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  };
  if (!requestPath.startsWith(base) || requestPath.includes('\\') || requestPath.includes('\0')) {
    missing();
    return;
  }
  let local = path.resolve(root, requestPath.slice(base.length) || '.');
  if (local !== root && !local.startsWith(`${root}${path.sep}`)) {
    missing();
    return;
  }
  try {
    if (fs.statSync(local).isDirectory()) {
      if (!requestPath.endsWith('/')) {
        response.writeHead(301, { Location: `${requestPath}/` });
        response.end();
        return;
      }
      local = path.join(local, 'index.html');
    }
    const real = fs.realpathSync(local);
    const extension = path.extname(real).toLowerCase();
    if (!real.startsWith(`${root}${path.sep}`) || !types[extension]) {
      missing();
      return;
    }
    const bytes = fs.readFileSync(real);
    const headers = { 'Content-Type': types[extension] };
    if (extension === '.pdf' && new URL(request.url, 'http://127.0.0.1').searchParams.get('download') === '1') headers['Content-Disposition'] = `attachment; filename="${path.basename(real)}"`;
    if (rangeTypes.has(extension)) headers['Accept-Ranges'] = 'bytes';
    const range = rangeTypes.has(extension) ? parseRange(request.headers.range, bytes.length) : null;
    if (range === false) {
      response.writeHead(416, { ...headers, 'Content-Range': `bytes */${bytes.length}`, 'Content-Length': 0 });
      response.end();
      return;
    }
    if (range) {
      const body = bytes.subarray(range.start, range.end + 1);
      response.writeHead(206, { ...headers, 'Content-Range': `bytes ${range.start}-${range.end}/${bytes.length}`, 'Content-Length': body.length });
      if (request.method === 'HEAD') response.end();
      else fs.createReadStream(real, { start: range.start, end: range.end, highWaterMark: 32768 })
        .on('error', () => response.destroy()).pipe(response);
      return;
    }
    response.writeHead(200, { ...headers, 'Content-Length': bytes.length });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(real, { highWaterMark: 32768 })
      .on('error', () => response.destroy()).pipe(response);
  } catch {
    missing();
  }
});

const requestedPort = Number(option('--port', '0'));
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && requestedPort) server.listen(0, '127.0.0.1');
  else throw error;
});
server.listen(requestedPort, '127.0.0.1', () => {
  const address = server.address();
  if (!address || typeof address === 'string') throw Error('No TCP address');
  const url = `http://127.0.0.1:${address.port}${base}`;
  const receipt = option('--receipt', null);
  if (receipt) fs.writeFileSync(receipt, JSON.stringify({ pid: process.pid, host: '127.0.0.1', port: address.port, url, root, base, view_id: viewId }));
  console.log(url);
  if (args.includes('--open')) spawn('explorer.exe', [url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
});

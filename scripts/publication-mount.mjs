// Website-owned wrapper only. No Card/Project rendering or mathematical constants.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { files,digest } from './distribution-policy.mjs';
const site=fileURLToPath(new URL('../',import.meta.url));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function verifyExport(profile,source) {
  if(profile.schema!=='exact.route-ready-mount.v1') throw Error('Unknown route-ready profile');
  const expected=new Map(profile.files.map(r=>[r.path,r]));
  const actual=files(source).map(f=>path.relative(source,f).split(path.sep).join('/')).sort();
  if(JSON.stringify(actual)!==JSON.stringify([...expected.keys()].sort())) throw Error('Unselected export file (possible private leak)');
  for(const [rel,pin] of expected) {
    if(!/^[a-zA-Z0-9_./-]+$/.test(rel)||rel.split('/').includes('..')||(!rel.startsWith(profile.mount_root+'/')&&!profile.envelope_files.includes(rel))) throw Error('Unsafe export path');
    const b=fs.readFileSync(path.join(source,rel));
    if(b.length!==pin.bytes||digest(b)!==pin.sha256) throw Error(`Changed pinned export: ${rel}`);
  }
  const projection=JSON.parse(fs.readFileSync(path.join(source,profile.projection),'utf8'));
  const ids=projection.cards.map(c=>c.card_ref.uid.split(':').at(-1));
  const routes=actual.filter(n=>n.startsWith(`${profile.mount_root}/cards/`)&&n.endsWith('/index.html'));
  if(JSON.stringify(routes.sort())!==JSON.stringify(ids.map(id=>`${profile.mount_root}/cards/${id}/index.html`).sort())) throw Error('Projection/Card route mismatch');
  return {files:actual.length,cards:ids.length};
}
export function integrateExport(output,base) {
  const profile=JSON.parse(fs.readFileSync(path.join(site,'publication/export-profile.json'),'utf8'));
  const source=path.resolve(site,'publication',profile.input_root);
  if(!source.startsWith(path.join(site,'publication')+path.sep)) throw Error('Export root escape');
  const verified=verifyExport(profile,source);
  const shell=fs.readFileSync(path.join(output,profile.mount_root,'index.html'),'utf8');
  const main=/<main id="main"[^>]*>[\s\S]*?<\/main>/;
  if(!main.test(shell)) throw Error('Website frame missing');
  const siteCopy=JSON.parse(fs.readFileSync(path.join(site,'src/data/site.json'),'utf8'));
  const wrapper=fs.readFileSync(path.join(site,'src/styles/publication-mount.css'),'utf8');
  for(const row of profile.files) {
    const dst=path.join(output,row.path),input=path.join(source,row.path),bytes=fs.readFileSync(input);
    fs.mkdirSync(path.dirname(dst),{recursive:true});
    if(!row.path.endsWith('.html')) {fs.writeFileSync(dst,bytes);continue;}
    const original=bytes.toString('utf8');
    if(/<script\b|<style\b/i.test(original)) throw Error('Export contract requires inert HTML and local styles');
    const title=/<title>([\s\S]*?)<\/title>/.exec(original)?.[1];
    const body=/<body>([\s\S]*?)<\/body>/.exec(original)?.[1];
    if(!title||!body) throw Error('Invalid exported document');
    let css='';
    for(const m of original.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)) {
      const styleFile=path.resolve(path.dirname(input),m[1]);
      if(!styleFile.startsWith(source+path.sep)) throw Error('Stylesheet escape');
      const parsed=postcss.parse(fs.readFileSync(styleFile,'utf8'));
      parsed.walkDecls(d=>{d.value=d.value.replace(/url\(([^)]+)\)/g,(_,raw)=>{
        const asset=path.resolve(path.dirname(styleFile),raw.replace(/["']/g,''));
        if(!asset.startsWith(source+path.sep)) throw Error('CSS asset escape');
        return `url("${base}${path.relative(source,asset).split(path.sep).join('/')}")`;
      });});
      parsed.walkRules(rule=>{rule.selectors=rule.selectors.map(s=>{
        const scoped=s.replace(/\b(?:html|body)\b/g,'.lfh-document');
        return scoped.startsWith('.lfh-document')?scoped:`.lfh-document ${scoped}`;
      });});
      css+=parsed.toString();
    }
    // Preserve the complete exported body, including its single main and every ID.
    const correction=`${base}corrections/?project=${encodeURIComponent(title.split(' | ')[0])}&locator=${encodeURIComponent('/'+row.path)}`;
    const entrance=row.path===`${profile.mount_root}/index.html`?`<section class="lfh-introduction" aria-label="About declaration cards"><p>${esc(siteCopy.annex.intro)}</p><p id="lfh-definition">Lean for Human (LFH) is the human-readable layer accompanying selected Lean declarations: declaration cards, exact source links, and guided Project views.</p><p>${esc(siteCopy.annex.sections[2].paragraphs[1])}</p><div class="work-grid">${siteCopy.annex.work.map(x=>`<article><h2>${esc(x.title)}</h2><p>${esc(x.text)}</p></article>`).join('')}</div></section>`:'';
    const releaseNotice=`<p>The canonical Lean source is public: <a href="${base}mathlibannex/releases/v0.1.0/">MathlibAnnex v0.1.0</a>. This retained declaration-card export remains a local review artifact pending its public-profile successor.</p>`;
    const evidence=row.path.includes('/releases/')?`<p>The retained export record below describes the supplied declarations. The root checker now verifies the complete website; <a href="${base}SITE_EXPORT_BINDING.json">the exact export binding</a> records the original envelope identities.</p>`:'';
    const content=`<div class="container lfh-frame"><div class="lfh-website-context"><a href="${esc(correction)}">Corrections and prior-art feedback</a>${releaseNotice}${evidence}</div>${entrance}<div class="lfh-document">${body}</div></div>`;
    const final=shell.replace(main,()=>content).replace(/<title>[\s\S]*?<\/title>/,()=>`<title>${title} — Exact Mathematics with AI</title>`)
      .replace("font-src 'none'","font-src 'self'").replace('</head>',()=>`<style>${css}\n${wrapper}</style></head>`);
    if(!final.includes(body)) throw Error('Export body preservation failure');
    fs.writeFileSync(dst,final);
  }
  console.log(`PASS_ROUTE_READY_MOUNT ${JSON.stringify({...verified,base})}`);
}

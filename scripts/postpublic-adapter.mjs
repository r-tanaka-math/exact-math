// Website-owned, byte-pinned hosting adapter. The Workbench article and source
// bytes are inputs, never edited; only surrounding reader-facing HTML is adapted.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {integrateReaderRestoration} from './reader-restoration-adapter.mjs';

const repo=fileURLToPath(new URL('../',import.meta.url));
const authority='232067522f10f7bc108802d05e52c6d5d9c0a35d94c7dad95b1bbb5e9ff4e927';
const selected=path.join(repo,'publication','workbench','selected',authority);
const manifestHash='cc97b7b8aaef8208b3a877c64bbc4b4bb526c4f0ed5a7b831b4de8978b0b7968';
const fonts={
  'DejaVuSans.ttf':[741536,'08ca98e69d9d8fa1065584b4f9ab7d49b6205abea6572b90e171b254845bb990'],
  'DejaVuSans-Bold.ttf':[693876,'7e69e81478e233b81c3ad730f5b10abe76c792d48ec6c3e7cc3b3596a37bb3b1'],
  'lean-main-4bee0719801e.woff2':[15428,'4bee0719801e47c4762974e1fd4ae5f53446661084d6ffafae1f6f1027e1aad3'],
  'lean-nary-6b21e0df2fbc.woff2':[3076,'6b21e0df2fbcd835be361be17351da144cc1a03ef0540f5e9de70f99cad7b272'],
};
const notices=['DEJAVU-LICENSE.txt','FREEMONO-COPYING.txt','FREEMONO-README.txt','FREEMONO-WEBFONT-NOTICE.txt','NOTICE.txt','PROVENANCE.json'];
const sha=b=>createHash('sha256').update(b).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const fail=s=>{throw Error('Post-public adapter: '+s)};
const safe=rel=>{
  if(typeof rel!=='string'||!rel.split('/').every(p=>/^[a-zA-Z0-9_.-]+$/.test(p)&&p!=='.'&&p!=='..')||rel.includes('\\'))fail('unsafe route '+rel);
  return rel;
};
const allFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?allFiles(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:fail('special input'));

export function verifyPostPublic(selectedRoot=selected){
  const manifestFile=path.join(selectedRoot,'WEBSITE_ROUTE_MANIFEST.json');
  if(sha(fs.readFileSync(manifestFile))!==manifestHash)fail('route manifest identity');
  const m=read(manifestFile),web=path.join(selectedRoot,'WEB');
  if(m.public_cards!==11||m.canonical_card_links!==11||!Array.isArray(m.card_routes)||m.card_routes.length!==11||m.source_release?.commit!=='30963f26ac8ffa3dc3e9ec9de91fd0f9daf05305')fail('release or Card count');
  const seen=new Set();
  for(const row of m.files){
    const rel=safe(row.path),fold=rel.normalize('NFKC').toLowerCase();
    if(seen.has(fold))fail('collision');seen.add(fold);
    const b=fs.readFileSync(path.join(web,...rel.split('/')));
    if(b.length!==row.bytes||sha(b)!==row.sha256)fail('changed accepted file '+rel);
  }
  const expected=new Set(m.files.map(r=>r.path));
  const actual=allFiles(web).map(p=>path.relative(web,p).split(path.sep).join('/'));
  for(const rel of actual)if(!expected.has(rel)&&!Object.hasOwn(fonts,path.basename(rel))&&!notices.includes(path.basename(rel)))fail('unexpected input '+rel);
  if(actual.length!==expected.size+Object.keys(fonts).length)fail('missing input');
  for(const [name,[bytes,hash]] of Object.entries(fonts)){
    const b=fs.readFileSync(path.join(web,'mathlibannex','assets',name));
    if(b.length!==bytes||sha(b)!==hash)fail('font substitution '+name);
  }
  const cards=m.files.filter(r=>/^mathlibannex\/cards\/[a-f0-9]{64}\/index\.html$/.test(r.path));
  if(cards.length!==11||new Set(cards.map(r=>r.path.split('/')[2])).size!==11)fail('Card routes');
  const p=read(path.join(web,'mathlibannex','data','project-presentation-r1','mankiewicz','project.json'));
  if(p.cards?.length!==11||p.cards.some(c=>c.card_resolution!=='PUBLIC'||!/^\/mathlibannex\/cards\/[a-f0-9]{64}\/$/.test(c.canonical_card_link)))fail('Project Card state');
  const sphere=read(path.join(web,'mathlibannex','data','project-presentation-r1','sphere-rigidity','project.json'));
  if(sphere.nodes?.some(c=>c.card_resolution==='PUBLIC'))fail('Sphere contamination');
  return {manifest:m,web,cards};
}

export function integratePostPublic(output,base,profile){
  const {manifest,web,cards}=verifyPostPublic(),adapterPath=path.join(output,'WORKBENCH_ADAPTER.json');
  const adapter=read(adapterPath),mounted=[];
  const replaced=new Set();
  const r1Rows=new Map(read(path.join(repo,'publication','project-reader','r1-public-artifacts.json')).files.map(r=>[r.path,r]));
  const frameRel='mathlibannex/assets/site-frame.css';
  const controlRel='mathlibannex/assets/mounted-back-to-top.js';
  const frameBytes=fs.readFileSync(path.join(repo,'src','styles','card-frame.css'));
  const frameTarget=path.join(output,frameRel);
  if(fs.existsSync(frameTarget))fail('website frame asset collision');
  fs.mkdirSync(path.dirname(frameTarget),{recursive:true});fs.writeFileSync(frameTarget,frameBytes);
  mounted.push({path:frameRel,bytes:frameBytes.length,sha256:sha(frameBytes)});
  const controlBytes=fs.readFileSync(path.join(repo,'src','scripts','mounted-back-to-top.js'));
  const controlTarget=path.join(output,controlRel);
  if(fs.existsSync(controlTarget))fail('website control asset collision');
  fs.writeFileSync(controlTarget,controlBytes);
  mounted.push({path:controlRel,bytes:controlBytes.length,sha256:sha(controlBytes)});
  for(const row of manifest.files){
    const rel=safe(row.path);
    if(rel==='mathlibannex/index.html'||/^mathlibannex\/projects\/(?:mankiewicz|sphere-rigidity)\/index\.html$/.test(rel))continue;
    const src=fs.readFileSync(path.join(web,...rel.split('/'))),target=path.join(output,...rel.split('/'));
    if(r1Rows.has(rel)){
      const expected=r1Rows.get(rel);
      if(!fs.existsSync(target)||src.length!==expected.bytes||sha(src)!==expected.sha256)fail('published R1 source identity '+rel);
      fs.writeFileSync(target,src);
      replaced.add(rel);
      mounted.push({path:rel,bytes:src.length,sha256:sha(src),accepted_sha256:row.sha256,preserved_r1:true});
      continue;
    }
    if(fs.existsSync(target)){
      if(!rel.startsWith('mathlibannex/data/project-presentation-r1/mankiewicz/')&&!rel.startsWith('mathlibannex/documents/mankiewicz-')&&!rel.startsWith('mathlibannex/projects/mankiewicz/')&&!rel.startsWith('mathlibannex/assets/project-presentation-r1/'))fail('route collision '+rel);
      replaced.add(rel);
    }
    let bytes=src,articleHash=null;
    if(rel.endsWith('/index.html')||rel.endsWith('/boundary.html')){
      let html=src.toString('utf8');
      const article=rel.startsWith('mathlibannex/cards/')?/<article\b[^>]*>[\s\S]*?<\/article>/.exec(html)?.[0]:null;
      if(rel.startsWith('mathlibannex/cards/')&&!article)fail('missing rich Card article '+rel);
      if(article)articleHash=sha(Buffer.from(article));
      if(rel==='mathlibannex/catalog/index.html')html=html.replace('11 canonical Cards in the Mankiewicz Project.','The current whole-library Catalog contains 11 canonical Cards, all referenced by the Mankiewicz Project.').replace('Read the common verification contract','Read the common verification contract');
      if(rel==='mathlibannex/verification/index.html')html=html.replace('exact candidate identities','exact Card identities');
      const context=`<div class="exact-site-context"><a href="${base}">Exact Mathematics home</a> · <a href="${base}mathlibannex/">MathlibAnnex hub</a> · <a href="${base}licensing/">Content terms</a> · <a href="${base}corrections/">Corrections</a></div>`;
      if(!/<body\b[^>]*>/i.test(html)||!html.includes('</body>')||html.includes('id="site-top"')||html.includes('data-exact-mounted'))fail('unexpected mounted HTML shell '+rel);
      html=html.replace('</header>',`${context}</header>`)
        .replace(/<body\b([^>]*)>/i,'<body$1><div id="site-top" tabindex="-1"></div>')
        .replace('</body>',`<p class="exact-back"><a href="#site-top">Back to top</a></p><a class="back-to-top" data-exact-mounted href="#site-top" aria-label="Back to top" hidden><span aria-hidden="true">↑</span><span class="back-to-top-label">Back to top</span></a><script src="${base}${controlRel}" defer></script></body>`);
      if(!/<meta name="robots"/.test(html))html=html.replace('</head>','<meta name="robots" content="noindex,follow"></head>');
      if(!/Content-Security-Policy/.test(html))html=html.replace('</head>',`<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;self&#39;; font-src &#39;self&#39;; img-src &#39;self&#39;; script-src &#39;self&#39;; connect-src &#39;none&#39;; base-uri &#39;none&#39;"></head>`);
      else {
        if(!/script-src (?:&#39;|')none(?:&#39;|');/.test(html))fail('unexpected mounted CSP '+rel);
        html=html.replace(/script-src (?:&#39;|')none(?:&#39;|');/,"script-src &#39;self&#39;;");
      }
      html=html.replace('</head>',`<link rel="stylesheet" href="${base}${frameRel}"></head>`);
      if(!html.includes(`src="${base}${controlRel}"`)||!html.includes('script-src &#39;self&#39;'))fail('mounted control or CSP missing '+rel);
      if(article&&!html.includes(article))fail('accepted Card article edited');
      bytes=Buffer.from(html);
    }
    fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);
    mounted.push({path:rel,bytes:bytes.length,sha256:sha(bytes),accepted_sha256:row.sha256,...articleHash?{accepted_article_sha256:articleHash}:{}});
  }
  for(const name of Object.keys(fonts)){
    const rel='mathlibannex/assets/'+name,bytes=fs.readFileSync(path.join(web,...rel.split('/'))),target=path.join(output,rel);
    fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);
    mounted.push({path:rel,bytes:bytes.length,sha256:sha(bytes)});
  }
  adapter.mounted=adapter.mounted.filter(r=>!replaced.has(r.path)).concat(mounted);
  adapter.selected_public_presentation={authority_zip_sha256:authority,route_manifest_sha256:manifestHash,public_cards:11,canonical_cards:cards.length,source_release:manifest.source_release,fonts:Object.fromEntries(Object.entries(fonts).map(([k,v])=>[k,v[1]]))};
  adapter.historical_zero_card_presentation=true;
  integrateReaderRestoration(output,base,adapter,frameRel,controlRel);
  fs.writeFileSync(adapterPath,JSON.stringify(adapter,null,2)+'\n');
  console.log(`PASS_POSTPUBLIC_11_CARD_ADAPTER ${base} ${profile}`);
}

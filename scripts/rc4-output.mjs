import fs from 'node:fs';
import path from 'node:path';
import {files,digest,reports} from './distribution-policy.mjs';
import {gitIdentity,publicWording} from './deployment-identity.mjs';

const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const faviconLinks=base=>[
  `<link rel="icon" href="${base}favicon.ico" sizes="any">`,
  `<link rel="icon" type="image/svg+xml" href="${base}favicon.svg">`,
  `<link rel="icon" type="image/png" sizes="32x32" href="${base}favicon-32x32.png">`,
  `<link rel="icon" type="image/png" sizes="16x16" href="${base}favicon-16x16.png">`,
  `<link rel="apple-touch-icon" sizes="180x180" href="${base}apple-touch-icon.png">`,
].join('');
function ensureFaviconHead(html,base,route){
  const tags=[...html.matchAll(/<link\b[^>]*\brel="(?:icon|apple-touch-icon)"[^>]*>/g)].map(m=>m[0]);
  const names=['favicon.ico','favicon.svg','favicon-32x32.png','favicon-16x16.png','apple-touch-icon.png'];
  if(tags.length===0){
    if(html.split('</head>').length!==2)throw Error('Missing HTML head '+route);
    return html.replace('</head>',faviconLinks(base)+'</head>');
  }
  if(tags.length!==5||names.some(name=>tags.filter(tag=>tag.includes(`href="${base}${name}"`)).length!==1))throw Error('Incomplete or duplicate favicon links '+route);
  return html;
}
export function finishOutput(root,deployment,profile,mode,release){
  const {base,origin,canonical_root}=deployment;
  const qualification=profile==='PUBLIC_RELEASE_QUALIFICATION';
  const indexable=['INDEXABLE_QUALIFICATION','FULL_LAUNCH','PUBLIC_RELEASE_QUALIFICATION'].includes(profile);
  const publicProfile=publicWording(profile);
  const identity=gitIdentity(profile);
  const pages=files(root).filter(p=>p.endsWith('.html')),sitemap=[],owned=[];
  for(const p of pages){
    const rel=path.relative(root,p).split(path.sep).join('/');
    let t=ensureFaviconHead(fs.readFileSync(p,'utf8'),base,rel);
    const excluded=/^(?:404\.html|research\/sr\/|corrections\/(?:received|demo)\/)/.test(rel);
    const support=/^mathlibannex\/(?:sources\/|verification\/|releases\/candidate-r1\/|overviews\/mankiewicz\/boundary\.html)/.test(rel);
    const route=rel==='index.html'?'':rel.replace(/index\.html$/,'');
    const canonical=canonical_root+(rel==='research/sr/index.html'?'research/sphere-rigidity/':route);
    t=t.replace(/<meta name="robots"[^>]*>/,`<meta name="robots" content="${indexable&&!excluded&&!support?'index,follow':'noindex,follow,noarchive'}">`);
    const title=/<title>([\s\S]*?)<\/title>/.exec(t)[1],desc=/<meta name="description" content="([^"]*)"/.exec(t)?.[1]||'Exact Mathematics with AI';
    t=t.replace('</head>',`<link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Exact Mathematics with AI"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${desc}"><meta property="og:url" content="${canonical}"></head>`);
    fs.writeFileSync(p,t);
    if(!excluded&&!support)sitemap.push(canonical);
    const visible=t.replace(/<div class="lfh-document">[\s\S]*?<\/body>\s*<\/html>\s*<\/div>/,'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,' ');
    if(profile!=='LOCAL_REVIEW'&&/private current|private canonical source|formal public admission not granted|content license pending|P2-LF/i.test(visible))throw Error('Stale public prose '+rel);
    if(publicProfile&&!excluded&&!rel.startsWith('mathlibannex/projects/')){
      const withoutQualification=t.replace(/<div class="preview-strip">[\s\S]*?<\/div><\/div>/,'');
      const ownedText=withoutQualification.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,' ');
      if(/private preview|local review|not yet public|not published|not yet effective|local companion review|no public release date/i.test(ownedText))throw Error('Stale public state '+rel);
    }
    owned.push(rel);
  }
  const adapterPath=path.join(root,'WORKBENCH_ADAPTER.json'),adapter=JSON.parse(fs.readFileSync(adapterPath,'utf8'));
  for(const row of adapter.mounted)if(row.path.endsWith('.html')){const b=fs.readFileSync(path.join(root,row.path));row.pre_finalize_sha256=row.sha256;row.bytes=b.length;row.sha256=digest(b)}
  fs.writeFileSync(adapterPath,JSON.stringify(adapter,null,2)+'\n');
  fs.writeFileSync(path.join(root,'robots.txt'),indexable?'User-agent: *\nAllow: /\nDisallow: /corrections/received/\nDisallow: /corrections/demo/\nSitemap: '+canonical_root+'sitemap.xml\n':'User-agent: *\nDisallow: /\n');
  fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+sitemap.sort().map(u=>'<url><loc>'+u+'</loc></url>').join('')+'</urlset>\n');
  const publicationState=release?'AUTHORIZED_POSTPUBLIC_UPDATE':qualification?'LOCAL_POSTPUBLIC_SUCCESSOR_QUALIFICATION':'LOCAL_REVIEW';
  const indexing=release?'PUBLIC_INDEXABLE':qualification?'LOCAL_INDEXABLE_QUALIFICATION':profile==='INDEXABLE_QUALIFICATION'?'INDEXABLE_QUALIFICATION_ONLY':'NOINDEX';
  fs.writeFileSync(path.join(root,'release-state.json'),JSON.stringify({schema:'exact.site-release-state.v5',site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:'3925e899c1660a2520845f3117d7bdd34dafbe47',profile,canonical_origin:origin,base,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,publication_state:publicationState,source:'PUBLISHED_V0_2_0',lfh:'MANKIEWICZ_11_CARD_SUCCESSOR',project_views:'MANKIEWICZ_AND_SPHERE_AVAILABLE',public_cards:publicProfile?11:0,mankiewicz_public_cards:publicProfile?11:0,mankiewicz_canonical_card_links:publicProfile?11:0,sphere_rigidity_public_cards:0,content_inputs:publicProfile?'ACCEPTED_WORKBENCH_FIX1_SELECTED':'LOCAL_REVIEW',content_terms:publicProfile?'PUBLIC_EFFECTIVE':'OWNER_APPROVED_PENDING_PUBLICATION',effective_now:!!release,brief_first_publication_date:'2026-09-17',site_first_publication_date:'2026-09-17',first_publication_date:'2026-09-17',card_first_publication_date:release?.act.update_date_asia_tokyo||null,indexing,feedback_mode:mode,formspree_submissions_intercepted:qualification,formspree_automated_live_posts:0},null,2)+'\n');
  fs.writeFileSync(path.join(root,'SITE_EXPORT_BINDING.json'),JSON.stringify({schema:'exact.integrated-export-binding.v3',base,profile,feedback_mode:mode,canonical_origin:origin,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,files:[],pdfs:reports.map(({logical_path,sha256,bytes})=>({path:logical_path,sha256,bytes})),site_commit:identity.commit,site_tree:identity.tree},null,2)+'\n');
  fs.writeFileSync(path.join(root,'TERMINOLOGY_AUDIT.json'),JSON.stringify({status:'PASS',profile,owned_routes:owned,retained_old_exports_only_in_private_source:true},null,2)+'\n');
  fs.copyFileSync(new URL('./postpublic-check.py',import.meta.url),path.join(root,'CHECK.py'));
  const inv=files(root).filter(f=>!['MANIFEST.json','SHA256SUMS.txt'].includes(path.basename(f))).map(f=>{const b=fs.readFileSync(f);return {path:path.relative(root,f).split(path.sep).join('/'),bytes:b.length,sha256:digest(b)}}).sort((a,b)=>a.path<b.path?-1:1);
  fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify({schema:'exact.integrated-site-manifest.v2',files:inv},null,2)+'\n');
  fs.writeFileSync(path.join(root,'SHA256SUMS.txt'),inv.map(r=>r.sha256+'  '+r.path+'\n').join(''));
}

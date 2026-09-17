import fs from 'node:fs';
import path from 'node:path';
import {files,digest,reports} from './distribution-policy.mjs';
import {gitIdentity,publicWording} from './deployment-identity.mjs';

const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function finishOutput(root,deployment,profile,mode,release){
  const {base,origin,canonical_root}=deployment;
  const qualification=profile==='PUBLIC_RELEASE_QUALIFICATION';
  const indexable=['INDEXABLE_QUALIFICATION','FULL_LAUNCH'].includes(profile);
  const publicProfile=publicWording(profile);
  const identity=gitIdentity(profile);
  const pages=files(root).filter(p=>p.endsWith('.html')),sitemap=[],owned=[];
  for(const p of pages){
    const rel=path.relative(root,p).split(path.sep).join('/');
    let t=fs.readFileSync(p,'utf8');
    const excluded=/^(?:404\.html|research\/sr\/|corrections\/(?:received|demo)\/)/.test(rel);
    const route=rel==='index.html'?'':rel.replace(/index\.html$/,'');
    const canonical=canonical_root+(rel==='research/sr/index.html'?'research/sphere-rigidity/':route);
    t=t.replace(/<meta name="robots"[^>]*>/,`<meta name="robots" content="${indexable&&!excluded?'index,follow':'noindex,nofollow,noarchive'}">`);
    const title=/<title>([\s\S]*?)<\/title>/.exec(t)[1],desc=/<meta name="description" content="([^"]*)"/.exec(t)?.[1]||'Exact Mathematics with AI';
    t=t.replace('</head>',`<link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Exact Mathematics with AI"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${desc}"><meta property="og:url" content="${canonical}"></head>`);
    fs.writeFileSync(p,t);
    if(!excluded)sitemap.push(canonical);
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
  for(const row of adapter.mounted)if(row.path.endsWith('/index.html')){const b=fs.readFileSync(path.join(root,row.path));row.pre_finalize_sha256=row.sha256;row.bytes=b.length;row.sha256=digest(b)}
  fs.writeFileSync(adapterPath,JSON.stringify(adapter,null,2)+'\n');
  fs.writeFileSync(path.join(root,'robots.txt'),indexable?'User-agent: *\nAllow: /\nDisallow: /corrections/received/\nDisallow: /corrections/demo/\nSitemap: '+canonical_root+'sitemap.xml\n':'User-agent: *\nDisallow: /\n');
  fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+sitemap.sort().map(u=>'<url><loc>'+u+'</loc></url>').join('')+'</urlset>\n');
  const publicationState=release?'AUTHORIZED_PUBLIC_RELEASE':qualification?'QUALIFICATION_ONLY_NOT_PUBLISHED':'NOT_PUBLISHED';
  const indexing=release?'PUBLIC_INDEXABLE':qualification?'QUALIFICATION_NOINDEX':profile==='INDEXABLE_QUALIFICATION'?'INDEXABLE_QUALIFICATION_ONLY':'NOINDEX';
  fs.writeFileSync(path.join(root,'release-state.json'),JSON.stringify({schema:'exact.site-release-state.v4',site_commit:identity.commit,site_tree:identity.tree,profile,canonical_origin:origin,base,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,publication_state:publicationState,source:'PUBLISHED_V0_2_0',lfh:release?'AUTHORIZED_PUBLIC_RELEASE':qualification?'QUALIFICATION_ONLY_NOT_PUBLISHED':'NOT_PUBLISHED',project_views:release?'PUBLIC_AVAILABLE':qualification?'QUALIFICATION_ONLY_NOT_PUBLISHED':'LOCAL_REVIEW_NOT_PUBLISHED',public_cards:0,content_inputs:publicProfile?'NEUTRAL_PUBLIC_PRESENTATION_SUPPLIED':'LOCAL_REVIEW',content_terms:release?'PUBLIC_EFFECTIVE':qualification?'PUBLIC_WORDING_QUALIFICATION_ONLY':'OWNER_APPROVED_PENDING_PUBLICATION',effective_now:!!release,brief_candidate_date:'2026-09-17',first_publication_date:release?.act.publication_date||null,indexing,feedback_mode:mode,formspree_submissions_intercepted:qualification,formspree_automated_live_posts:0},null,2)+'\n');
  fs.writeFileSync(path.join(root,'SITE_EXPORT_BINDING.json'),JSON.stringify({schema:'exact.integrated-export-binding.v3',base,profile,feedback_mode:mode,canonical_origin:origin,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,files:[],pdfs:reports.map(({logical_path,sha256,bytes})=>({path:logical_path,sha256,bytes})),site_commit:identity.commit,site_tree:identity.tree},null,2)+'\n');
  fs.writeFileSync(path.join(root,'TERMINOLOGY_AUDIT.json'),JSON.stringify({status:'PASS',profile,owned_routes:owned,retained_old_exports_only_in_private_source:true},null,2)+'\n');
  fs.copyFileSync(new URL('./integrated-check.py',import.meta.url),path.join(root,'CHECK.py'));
  const inv=files(root).filter(f=>!['MANIFEST.json','SHA256SUMS.txt'].includes(path.basename(f))).map(f=>{const b=fs.readFileSync(f);return {path:path.relative(root,f).split(path.sep).join('/'),bytes:b.length,sha256:digest(b)}}).sort((a,b)=>a.path<b.path?-1:1);
  fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify({schema:'exact.integrated-site-manifest.v2',files:inv},null,2)+'\n');
  fs.writeFileSync(path.join(root,'SHA256SUMS.txt'),inv.map(r=>r.sha256+'  '+r.path+'\n').join(''));
}

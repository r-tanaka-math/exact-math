import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {files} from './distribution-policy.mjs';
const digest=b=>createHash('sha256').update(b).digest('hex');
const forbidden=/\bSR\b|\bP2-[\w-]+|\bRC\d+\b|\bR0[1-9]\b|\blanes?\b|\bpilot\b|\bcanary\b|owner-host|locally integrated|managed outside this website project|private preview|candidate identities|PUBLICATION_CANDIDATE|NOT_PUBLISHED|NOINDEX|CONTENT_TERMS_[A-Z_]+|FORMSPREE_LIVE_[A-Z_]+/gi;
const prose=t=>t.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,' ');
export function qualifyPolish(root,base,mode){
 const site=new URL('../',import.meta.url);const profile=JSON.parse(fs.readFileSync(new URL('publication/export-profile.json',site),'utf8'));
 const input=new URL('publication/'+profile.input_root+'/',site);const rows=[],owned=[],upstream=[];let definitions=0;
 for(const row of profile.files){
  const bytes=fs.readFileSync(new URL(row.path,input)),r={...row};
  if(row.path.endsWith('.html')){const body=/<body>([\s\S]*?)<\/body>/.exec(bytes.toString('utf8'))[1];r.body_bytes=Buffer.byteLength(body);r.body_sha256=digest(Buffer.from(body));
   const text=prose(body),terms=[...text.matchAll(/\bLFH\b|publication candidate|owner-approved|owner-directed private current|private canonical source|formal public admission not granted|content license pending|candidate identities|\bSR\b|\bP2-[\w-]+/gi)].map(m=>m[0]);if(terms.length)upstream.push({route:row.path,source:'publication/'+profile.input_root+'/'+row.path,terms:[...new Set(terms)],disposition:'IMMUTABLE_WORKBENCH_PROFILE_REQUESTED'});
  }rows.push(r);
 }
 for(const file of files(root).filter(f=>f.endsWith('.html'))){
  const rel=path.relative(root,file).split(path.sep).join('/');let html=fs.readFileSync(file,'utf8');const original=rows.find(r=>r.path===rel);
  if(original?.body_sha256){const body=/<body>([\s\S]*?)<\/body>/.exec(fs.readFileSync(new URL(rel,input),'utf8'))[1];if(!html.includes(body))throw Error('Modified original body');html=html.replace(body,'');}
  const text=prose(html),bad=[...text.matchAll(forbidden)].map(m=>m[0]);if(bad.length)throw Error(`Public terminology lint: ${rel}: ${bad.join(', ')}`);
  definitions+=(text.match(/Lean for Human \(LFH\) is the human-readable layer/g)||[]).length;
  owned.push({route:rel,internal_terms:0});
 }
 if(definitions!==1)throw Error('Exactly one public LFH definition required');
 fs.writeFileSync(path.join(root,'TERMINOLOGY_AUDIT.json'),JSON.stringify({status:'PASS',owned,immutable_workbench_gaps:upstream,definition_count:definitions},null,2)+'\n');
 fs.copyFileSync(new URL('scripts/integrated-check.py',site),path.join(root,'CHECK.py'));
 fs.writeFileSync(path.join(root,'SITE_EXPORT_BINDING.json'),JSON.stringify({schema:'exact.integrated-export-binding.v1',base,feedback_mode:mode,site_commit:process.env.EXACT_SITE_REVISION||'DEVELOPMENT',upstream_export_sha256:profile.upstream_export_sha256,envelope_policy:'ROOT_CHECKER_AND_INVENTORY_DESCRIBE_COMPLETE_INTEGRATED_SITE; EXACT_ORIGINAL_ENVELOPE_RETAINED_WITH_SOURCE_EXPORT_IN_RETURN',files:rows},null,2)+'\n');
 const inventory=files(root).map(file=>{const rel=path.relative(root,file).split(path.sep).join('/'),b=fs.readFileSync(file);return {path:rel,bytes:b.length,sha256:digest(b)}}).filter(r=>!['MANIFEST.json','SHA256SUMS.txt'].includes(r.path)).sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
 fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify({schema:'exact.integrated-site-manifest.v1',expected_token:'PASS_EXACT_SITE_INTEGRATED_ROOT_R1',files:inventory},null,2)+'\n');
 fs.writeFileSync(path.join(root,'SHA256SUMS.txt'),inventory.map(r=>r.sha256+'  '+r.path+'\n').join(''));
 console.log('PASS_RC3_PUBLIC_COPY_LINT_AND_INTEGRATED_ENVELOPE');
}

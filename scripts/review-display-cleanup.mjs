// Bounded successor to the already published 64-Card assembly. No mathematical renderer.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {publicHTML,verifyNaimarkArxivSelection} from './naimark-arxiv-public-adapter.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const prefix='publication/review-display-cleanup';
const dir=path.join(root,prefix);
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(v,m)=>{if(!v)throw Error('REVIEW_DISPLAY_CLEANUP_REFUSED: '+m)};
const same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
const routes=['about/index.html','index.html','mathlibannex/verification/index.html','research/index.html','research/naimark-problem/index.html','research/naimark-problem/paper-record.json','research/sphere-rigidity/index.html','verification/index.html'];
const integrationPaths=['astro.config.mjs','scripts/naimark-arxiv-public-adapter.mjs','scripts/postpublic-gate.mjs','scripts/review-display-cleanup.mjs','src/components/pages/Research.astro','src/config.ts','src/lib/project-presentation.ts','src/lib/review-display-projection.ts'];
const allowedPaths=[...integrationPaths,...routes.flatMap(r=>[prefix+'/baseline/'+r,prefix+'/selected/'+r]),...['metadata.json','plan.json','selection.json'].map(r=>prefix+'/'+r)].sort();
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked file');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special file'),[])});

export function verifyReviewDisplaySelection(){
  const inherited=verifyNaimarkArxivSelection();
  const metadataBytes=fs.readFileSync(path.join(dir,'metadata.json')),metadata=JSON.parse(metadataBytes);
  const planBytes=fs.readFileSync(path.join(dir,'plan.json')),plan=JSON.parse(planBytes);
  const selectionBytes=fs.readFileSync(path.join(dir,'selection.json')),selection=JSON.parse(selectionBytes);
  need(metadata.schema==='exact.review-display-cleanup.metadata.v1'&&metadata.task==='EXACT_REVIEW_DISPLAY_CLEANUP_R1','new task identity');
  same([metadata.old_commit,metadata.old_tree],['94a0b9528cd7455861564af4bde5f0b8b897f2ff','c3792d5dfee53ea69f756ea3bb0c33061076ccfd'],'published baseline');
  need(metadata.dispatch_sha256==='7c92b80b2dfb8a94cd63e5e3e528f979c8b89280a358403a7b96eaf7d6f0cbb8','dispatch identity');
  need(metadata.plan_sha256===sha(planBytes),'plan identity');
  same([metadata.base_metadata_sha256,metadata.base_selection_sha256],[inherited.metadata_sha256,inherited.selection_sha256],'immutable published batch');
  same(metadata.source_release,inherited.metadata.source_release,'source v0.4.0 inheritance');
  need(metadata.public_cards===64&&metadata.new_mathematical_review===false&&metadata.content_terms_sha256===inherited.metadata.content_terms_sha256,'64 Cards and terms unchanged');
  same(plan.files.map(r=>r.path).sort(),routes,'bounded planned routes');
  same(selection.files.map(r=>r.path).sort(),routes,'bounded selected routes');
  for(const kind of ['baseline','selected'])same(files(path.join(dir,kind)).map(p=>path.relative(path.join(dir,kind),p).split(path.sep).join('/')).sort(),routes,'exact '+kind+' file set');
  for(const row of plan.files){
    const before=fs.readFileSync(path.join(dir,'baseline',row.path)),after=fs.readFileSync(path.join(dir,'selected',row.path));
    need(before.length===row.before_bytes&&sha(before)===row.before_sha256,'before identity '+row.path);
    need(after.length===row.after_bytes&&sha(after)===row.after_sha256,'after identity '+row.path);
    const selected=selection.files.find(r=>r.path===row.path);
    same([selected.bytes,selected.sha256],[after.length,sha(after)],'selection identity');
    if(row.operations){
      let result=before.toString('utf8');
      for(const op of row.operations){need(op.before&&result.split(op.before).length-1===op.expected_occurrences,'exact operation '+row.path);result=result.replaceAll(op.before,op.after);}
      need(Buffer.from(result).equals(after),'reproducible display transformation');
      for(const tag of ['style','script','nav','footer']){
        const re=new RegExp('<'+tag+'\\b[^>]*>[\\s\\S]*?</'+tag+'>','gi');
        same(before.toString().match(re),after.toString().match(re),'unchanged '+tag+' '+row.path);
      }
      same([...before.toString().matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(m=>m[1]),[...after.toString().matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(m=>m[1]),'link order/destinations');
      need(!/data-axis="human"|id="human"|Human mathematical review|Author's proof review recorded|22 Sept 2026 · Author review/.test(after.toString()),'removed standing self-review display');
    }else{
      const expected=JSON.parse(before),current=JSON.parse(after);
      for(const key of row.json_remove_keys){need(Object.hasOwn(expected,key),'existing self-report key');delete expected[key];}
      Object.assign(expected,row.json_set);same(current,expected,'bibliography-only projection');
      need(current.arxiv_submission_date==='2026-09-22'&&current.peer_review_claim===false,'arXiv date and peer-review boundary');
    }
  }
  need(metadata.paper_record_sha256===selection.files.find(r=>r.path.endsWith('paper-record.json')).sha256,'current bibliography identity');
  return {metadata,plan,selection,metadata_sha256:sha(metadataBytes),selection_sha256:sha(selectionBytes)};
}

export function validateReviewDisplayAct(act,identity,deployment,today){
  const {metadata,metadata_sha256,selection_sha256}=verifyReviewDisplaySelection();
  need(act?.schema==='exact.owner-postpublic-update-act.v6'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE','explicit current exact owner act');
  need(act.update_kind===metadata.task,'current update kind');
  same([act.old_commit,act.old_tree],[metadata.old_commit,metadata.old_tree],'owner baseline');
  same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact successor');
  same([act.public_repository,act.canonical_origin],[metadata.public_repository,metadata.canonical_origin],'authorized repository/origin');
  same([deployment.public_repository,deployment.origin,deployment.base,deployment.deployment_profile],[metadata.public_repository,metadata.canonical_origin,'/','ROOT'],'root deployment');
  need(today===metadata.site_update_date&&act.update_date_asia_tokyo===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'actual update date');
  same([act.metadata_sha256,act.selection_sha256,act.plan_sha256],[metadata_sha256,selection_sha256,metadata.plan_sha256],'exact selection/plan/metadata');
  same([act.dispatch_sha256,act.base_metadata_sha256,act.base_selection_sha256],[metadata.dispatch_sha256,metadata.base_metadata_sha256,metadata.base_selection_sha256],'authority and inherited 64-Card batch');
  same([act.public_cards,act.new_mathematical_review,act.paper_record_sha256,act.content_terms_sha256],[64,false,metadata.paper_record_sha256,metadata.content_terms_sha256],'protected content and bibliography');
  same(act.source_release,metadata.source_release,'unchanged formal source');
  need(git('rev-parse',metadata.old_commit+'^{tree}')===metadata.old_tree,'old Git tree');
  git('merge-base','--is-ancestor',metadata.old_commit,'HEAD');
  need(git('rev-list','--count',metadata.old_commit+'..HEAD')!=='0','new public successor required');
  need(git('rev-list','--merges',metadata.old_commit+'..HEAD')==='','linear public successor, no private ancestry merge');
  const manifestPath=prefix+'/source-files.json',manifestBytes=fs.readFileSync(path.join(root,manifestPath)),manifest=JSON.parse(manifestBytes);
  need(sha(manifestBytes)===act.source_files_sha256&&manifest.length===act.source_file_count,'source manifest identity');
  same(manifest.map(r=>r.path).sort(),allowedPaths,'bounded source allowlist');
  same(git('diff','--name-only',metadata.old_commit,'HEAD').split('\n').filter(Boolean).sort(),[...allowedPaths,manifestPath].sort(),'exact changed-path allowlist');
  need(git('diff','--name-only','--diff-filter=D',metadata.old_commit,'HEAD')==='','no deleted originals');
  for(const row of manifest){
    const p=path.join(root,row.path);need(fs.existsSync(p)&&!fs.lstatSync(p).isSymbolicLink(),'regular selected source');
    const b=fs.readFileSync(p);need(b.length===row.bytes&&sha(b)===row.sha256,'source bytes '+row.path);
  }
  return act;
}

export function finishReviewDisplayCleanup(output,deployment,profile,release){
  const {metadata,plan,metadata_sha256,selection_sha256}=verifyReviewDisplaySelection();
  for(const row of plan.files){
    const translate=b=>row.path.endsWith('.html')&&deployment.base!=='/'?Buffer.from(publicHTML(b.toString('utf8'),deployment.base,output)):b;
    const before=translate(fs.readFileSync(path.join(dir,'baseline',row.path)));
    const target=path.join(output,row.path);
    need(fs.readFileSync(target).equals(before),'assembled current baseline '+row.path);
    fs.writeFileSync(target,translate(fs.readFileSync(path.join(dir,'selected',row.path))));
  }
  const statePath=path.join(output,'release-state.json'),state=read(statePath);
  // Preserve initial publication dates, all 64 identities, approvals, reports, and source qualifications.
  const historical={site_commit:state.public_parent_commit,publication_batch:state.publication_batch,publication_date:state.publication_date,selection_sha256:state.selection_sha256,metadata_sha256:state.metadata_sha256};
  historical.site_commit=metadata.old_commit;
  Object.assign(state,{schema:'exact.site-release-state.v8',public_parent_commit:metadata.old_commit,publication_batch:metadata.task,site_update_date:metadata.site_update_date,site_artifact_generated_at_utc:new Date().toISOString(),paper_record_sha256:metadata.paper_record_sha256,selection_sha256,metadata_sha256,review_display_plan_sha256:metadata.plan_sha256,previous_publication:historical,review_display:'ARTIFACT_AND_CORRESPONDENCE_RECORDS_NO_STANDING_SELF_REVIEW_AXIS'});
  fs.writeFileSync(statePath,JSON.stringify(state,null,2)+'\n');
  console.log('PASS_REVIEW_DISPLAY_CLEANUP_OUTPUT',plan.files.length,profile,release?'AUTHORIZED':'LOCAL_QUALIFICATION');
}

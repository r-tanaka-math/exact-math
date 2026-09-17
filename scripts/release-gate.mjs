import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {verifyInputs,verifyCurrentSource,verifyPublicPresentationSuccessor} from './project-adapter.mjs';
import {deploymentIdentity,gitIdentity} from './deployment-identity.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const digest=b=>createHash('sha256').update(b).digest('hex');
const committedDigest=rel=>digest(execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-C',root,'show','HEAD:'+rel]));
const need=(ok,message)=>{if(!ok)throw Error(message)};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const ids=['MANKIEWICZ_PUBLIC_PROFILE_EXPORT','SPHERE_RIGIDITY_PROGRESSIVE_PROJECT_EXPORT'];
const expected={MANKIEWICZ_PUBLIC_PROFILE_EXPORT:'e0901857fdc2c9c0ec605b0c74db3824797f015a9ae8a08b452b3da1106a84a5',SPHERE_RIGIDITY_PROGRESSIVE_PROJECT_EXPORT:'bc61667f9afd4898a8c76f0e0874fd60048fa79b2ea7df1f861e899a26890d77b'};
export function tokyoCalendarDate(now=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const field=name=>parts.find(p=>p.type===name)?.value;
  return `${field('year')}-${field('month')}-${field('day')}`;
}

export function validateAct(act,commit,tree,slots,adapterSha,today=tokyoCalendarDate(),deployment={base:'/',origin:'https://exactmathematics.org',deployment_profile:'ROOT',public_repository:null},successorSha=null){
  need(act?.schema==='exact.owner-release-act.v2'&&act.authorized===true&&act.owner==='Ryotaro Tanaka','Explicit owner release act required');
  need(act.commit===commit&&act.site_tree===tree&&/^[a-f0-9]{40}$/.test(commit)&&/^[a-f0-9]{40}$/.test(tree),'Owner act must bind clean final site commit and tree');
  need(act.profile==='FULL_LAUNCH','This workflow requires the full public Project profile');
  need(act.deployment_profile===deployment.deployment_profile&&act.canonical_origin===deployment.origin,'Canonical origin and deployment profile approval');
  need(typeof act.public_repository==='string'&&/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(act.public_repository),'Public repository identity approval');
  need(act.public_repository===deployment.public_repository,'Public repository environment/act mismatch');
  need(act.public_repository==='https://github.com/r-tanaka-math/exact-math','Public repository identity rebind required');
  need(act.workbench_successor_manifest_sha256===successorSha&&/^[a-f0-9]{64}$/.test(successorSha||''),'Neutral Workbench public-presentation successor binding');
  need(/^\d{4}-\d{2}-\d{2}$/.test(act.publication_date||'')&&new Date(act.publication_date+'T00:00:00Z').toISOString().slice(0,10)===act.publication_date&&act.publication_date==='2026-09-17'&&act.publication_date===today,'17 September 2026 Asia/Tokyo release-day required; DATE_REBIND_REQUIRED after that date');
  need(act.prior_art_cutoff==='2026-09-15','Prior-art cutoff approval');
  if((Date.parse(today)-Date.parse(act.prior_art_cutoff))/86400000>30)need(act.older_cutoff_explicitly_accepted===true,'Prior-art delta decision required');
  need(/^[a-f0-9]{64}$/.test(act.brief_sha256||'')&&/^[a-f0-9]{64}$/.test(act.content_terms_sha256||''),'Dated Brief and effective terms approval required');
  need(act.adapter_lock_sha256===adapterSha,'Unapproved adapter lock');
  need(act.workbench_handoff_sha256==='b2d134860439de5547cd1678d5c9c68f57d6fc8ad6a1193a19afd309c756b4cc','Unapproved Workbench handoff');
  need(act.source_tag==='v0.2.0'&&act.source_commit==='30963f26ac8ffa3dc3e9ec9de91fd0f9daf05305'&&act.source_tree==='b3378851a5287f5e3c8418f668e4d0ba52718739','Current source identity approval');
  for(const id of ids){const slot=slots.slots.find(x=>x.id===id);need(slot?.state==='SUPPLIED_QUALIFIED_ADAPTER'&&slot.manifest_sha256===expected[id]&&act.workbench_manifests?.[id]===expected[id],'Qualified content input or owner binding missing: '+id)}
  return act;
}
export function releaseGate(deployment=deploymentIdentity('FULL_LAUNCH')){
  verifyCurrentSource();const lock=read(path.join(root,'publication','workbench','adapter-lock.json'));
  const slots=read(path.join(root,'publication','workbench-input-slots.json'));
  for(const id of ids){const slot=slots.slots.find(x=>x.id===id);need(slot?.state==='SUPPLIED_QUALIFIED_ADAPTER'&&slot.manifest_sha256===expected[id],'Full-launch content input gate is not satisfied');}
  const successor=verifyPublicPresentationSuccessor();
  const actPath=process.env.EXACT_RELEASE_ACT;
  need(actPath,'EXACT_RELEASE_ACT must identify a separate exact owner release act');
  const act=read(path.resolve(actPath));
  const {commit,tree}=gitIdentity('FULL_LAUNCH');
  const adapterSha=committedDigest('publication/workbench/adapter-lock.json');
  validateAct(act,commit,tree,slots,adapterSha,tokyoCalendarDate(),deployment,successor.manifest_sha256);
  need(act.content_terms_sha256===committedDigest('publication/content-terms-public-effective.md'),'Content terms approval identity');
  const selected=read(path.join(root,'publication','pdf-selection.json')).files.find(f=>f.artifact_id==='briefing');
  need(act.brief_sha256===selected.sha256,'Final dated Brief must be approved');
  const brief=read(path.join(root,'publication','brief-release-state.json'));
  need(brief.first_publication_date===act.publication_date&&brief.sha256===act.brief_sha256&&brief.all_pages_qualified===true&&brief.final_dated_render_qualified===true,'Final dated Brief render and all-page qualification required');
  need(lock.source.tag==='v0.2.0','Source release gate');
  return {act,imports:[]};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{releaseGate(deploymentIdentity('FULL_LAUNCH'));console.log('AUTHORIZED_RELEASE_READY');}
  catch(e){console.error('RELEASE_REFUSED: '+e.message);process.exitCode=1;}
}

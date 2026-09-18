import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {verifyPostPublic} from './postpublic-adapter.mjs';
import {verifyReaderSelection} from './reader-restoration-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
import {siteIconSha256} from './distribution-policy.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const parent='10b0766b39945e4ec132aebdad8844b78ac6a8bc';
const parentTree='4850a2458eebc3ad74543bcd528abed1ae10f526';
const initial='3925e899c1660a2520845f3117d7bdd34dafbe47';
const initialTree='2c4d4b0cf52b59cc09a83d61c81a818dfa6cb141';
const readerParent='c5090da1853b24da29cc1fcfe3f480d024024cab';
const readerParentTree='6a2a2b01cafee7f392868da32c800c6906ac36cd';
const combinedPublicParent='f803c6e085bea89d3ecad70cdbcd692593c0956d';
const combinedPublicTree='a3565601f31cc9cdba3ae13181e2ba4c18739318';
const homeCandidate='8097598e409c13f0968d8776bb93a14e4dc2fea4';
const homeCandidateTree='8a314496ed90e6e2c8f7212b71645b2e60545ac5';
const combinedKind='HOME_HUB_FAVICON_COMBINED_R1';
const combinedChangedPaths=[
  'public/apple-touch-icon.png','public/favicon-16x16.png','public/favicon-32x32.png',
  'public/favicon.ico','public/favicon.svg','scripts/distribution-policy.mjs',
  'scripts/postpublic-gate.mjs','scripts/rc4-output.mjs',
  'src/layouts/Layout.astro','src/pages/index.astro',
];
const sha=b=>createHash('sha256').update(b).digest('hex');
const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
const need=(x,s)=>{if(!x)throw Error('POSTPUBLIC_UPDATE_REFUSED: '+s)};
const same=(x,y,s)=>need(JSON.stringify(x)===JSON.stringify(y),s);
const selected='publication/workbench/selected/232067522f10f7bc108802d05e52c6d5d9c0a35d94c7dad95b1bbb5e9ff4e927/WEB/mathlibannex/';
const selectedFile=p=>fs.readFileSync(path.join(root,selected,p));
export function tokyoDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function validatePostPublicAct(act,identity,manifest,origin,repository,today=tokyoDate()){
  need(act?.schema==='exact.owner-postpublic-update-act.v1'&&act.authorized===true&&act.owner==='Ryotaro Tanaka','explicit exact owner update act required');
  same([act.old_commit,act.old_tree],[parent,parentTree],'old publication binding');
  same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'successor commit/tree binding');
  need(act.update_kind==='MANKIEWICZ_11_CARD_PUBLICATION','update kind');
  need(act.update_date_asia_tokyo===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'actual Asia/Tokyo update date');
  same([act.public_repository,act.canonical_origin],[repository,origin],'deployment identity');
  same([act.workbench_fix1_zip_sha256,act.route_manifest_sha256,act.project_json_sha256],
    ['232067522f10f7bc108802d05e52c6d5d9c0a35d94c7dad95b1bbb5e9ff4e927',
     'cc97b7b8aaef8208b3a877c64bbc4b4bb526c4f0ed5a7b831b4de8978b0b7968',
     sha(selectedFile('data/project-presentation-r1/mankiewicz/project.json'))],'selected presentation');
  const identities=JSON.parse(fs.readFileSync(path.join(root,'publication','workbench','selected',act.workbench_fix1_zip_sha256,'CARD_IDENTITIES.json'),'utf8'));
  same(act.card_identities,identities,'eleven exact Card identities and hashes');
  need(manifest.public_cards===11&&act.mankiewicz_public_cards===11&&act.sphere_rigidity_public_cards===0,'Card publication state');
  const requiredFonts={'DejaVuSans.ttf':'08ca98e69d9d8fa1065584b4f9ab7d49b6205abea6572b90e171b254845bb990','DejaVuSans-Bold.ttf':'7e69e81478e233b81c3ad730f5b10abe76c792d48ec6c3e7cc3b3596a37bb3b1','lean-main-4bee0719801e.woff2':'4bee0719801e47c4762974e1fd4ae5f53446661084d6ffafae1f6f1027e1aad3','lean-nary-6b21e0df2fbc.woff2':'6b21e0df2fbcd835be361be17351da144cc1a03ef0540f5e9de70f99cad7b272'};
  same(act.font_sha256,requiredFonts,'accepted four fonts');
  same([act.brief_sha256,act.content_terms_sha256,act.sphere_project_html_sha256,act.sphere_project_pdf_sha256,act.sphere_project_json_sha256],
    ['7eabe530c8ab74462515797325044ab5128a752a66c44581df9c5551ea07df1d',
     sha(execFileSync('git',['-C',root,'show','HEAD:publication/content-terms-public-effective.md'])),
     sha(selectedFile('projects/sphere-rigidity/index.html')),
     sha(selectedFile('documents/sphere-rigidity-project-r1.pdf')),
     sha(selectedFile('data/project-presentation-r1/sphere-rigidity/project.json'))],'unchanged Brief/terms/Sphere identities');
  need(act.content_terms_sha256==='eaf1195b43fdd0d4245fccaf2aa74b50287f176700567394e872cbb610e3d817','effective terms identity');
  return act;
}
export function validateReaderRestorationAct(act,identity,origin,repository,today=tokyoDate()){
  const integration=JSON.parse(fs.readFileSync(path.join(root,'publication','project-reader','integration-lock.json'),'utf8'));
  const ledger=JSON.parse(fs.readFileSync(path.join(root,'publication','project-reader','r1-public-artifacts.json'),'utf8'));
  const {routes}=verifyReaderSelection();
  need(act?.schema==='exact.owner-postpublic-update-act.v2'&&act.authorized===true&&act.owner==='Ryotaro Tanaka','separate exact owner reader-restoration act required');
  need(act.update_kind==='MATHLIBANNEX_PROJECT_READER_EXPERIENCE_RESTORATION_R1','reader update kind');
  same([act.old_commit,act.old_tree],[readerParent,readerParentTree],'old publication binding');
  same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'reader successor commit/tree');
  need(act.update_date_asia_tokyo===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'actual Asia/Tokyo update date');
  same([act.public_repository,act.canonical_origin],[repository,origin],'deployment identity');
  same([act.workbench_return_sha256,act.website_ia_return_sha256,act.route_manifest_sha256,act.presentation_binding_sha256],
    [integration.workbench_return_sha256,integration.website_ia_return_sha256,integration.route_manifest_sha256,integration.presentation_binding_sha256],'accepted Return and manifest bindings');
  same([act.mankiewicz_public_cards,act.sphere_rigidity_public_cards],[11,0],'public Card state');
  same(act.source_release,{tag:'v0.2.0',commit:integration.source_release_commit,tree:integration.source_release_tree},'source release');
  const protectedPaths={
    brief:'assets/reports/sphere-rigidity/draft-r1/sphere-rigidity-brief-report.pdf',
    prior_art:'assets/reports/sphere-rigidity/prior-art/r2/sphere-rigidity-prior-art-search.pdf',
    content_terms:'publication/content-terms-public-effective.md',
    source_release:'src/data/mathlibannex-release.json',
    card_identities:`publication/workbench/selected/232067522f10f7bc108802d05e52c6d5d9c0a35d94c7dad95b1bbb5e9ff4e927/CARD_IDENTITIES.json`,
  };
  const protectedHashes={};
  for(const [key,p] of Object.entries(protectedPaths)){
    const before=sha(execFileSync('git',['-C',root,'show',`${readerParent}:${p}`]));
    const after=sha(execFileSync('git',['-C',root,'show',`HEAD:${p}`]));
    need(before===after,'protected source changed '+key);
    protectedHashes[key]=before;
  }
  same(act.protected_source_sha256,protectedHashes,'unchanged Brief/prior-art/terms/source/Cards');
  need(sha(fs.readFileSync(path.join(root,'publication','project-reader','r1-public-artifacts.json')))===integration.r1_public_artifacts_sha256,'R1 ledger identity');
  same(act.r1_public_artifacts,ledger.files,'all existing R1 Project artifact identities');
  const successor={};
  for(const slug of ['mankiewicz','sphere-rigidity']){
    const files=routes.routes[slug].file_identity;
    successor[slug]={pdf:{path:`${integration.versioned_root}/projects/${slug}/project.pdf`,...files['project.pdf']},json:{path:`${integration.versioned_root}/projects/${slug}/project.json`,...files['project.json']}};
  }
  same(act.successor_projects,successor,'versioned successor PDF/JSON routes');
  return act;
}
export function combinedHomeFaviconBindings(){
  const integration=JSON.parse(fs.readFileSync(path.join(root,'publication','project-reader','integration-lock.json'),'utf8'));
  const ledger=JSON.parse(fs.readFileSync(path.join(root,'publication','project-reader','r1-public-artifacts.json'),'utf8'));
  const {routes}=verifyReaderSelection();
  const {manifest}=verifyPostPublic();
  need(manifest.public_cards===11&&ledger.files.length===18,'accepted Card and R1 artifact state');
  const protectedPaths={
    brief:'assets/reports/sphere-rigidity/draft-r1/sphere-rigidity-brief-report.pdf',
    prior_art:'assets/reports/sphere-rigidity/prior-art/r2/sphere-rigidity-prior-art-search.pdf',
    content_terms:'publication/content-terms-public-effective.md',
    source_release:'src/data/mathlibannex-release.json',
    card_identities:`publication/workbench/selected/232067522f10f7bc108802d05e52c6d5d9c0a35d94c7dad95b1bbb5e9ff4e927/CARD_IDENTITIES.json`,
    reader_integration_lock:'publication/project-reader/integration-lock.json',
    r1_artifact_ledger:'publication/project-reader/r1-public-artifacts.json',
    mankiewicz_project_html:'publication/workbench/reader-restoration-r1/projects/mankiewicz/index.html',
    mankiewicz_project_pdf:'publication/workbench/reader-restoration-r1/projects/mankiewicz/project.pdf',
    mankiewicz_project_json:'publication/workbench/reader-restoration-r1/projects/mankiewicz/project.json',
    sphere_project_html:'publication/workbench/reader-restoration-r1/projects/sphere-rigidity/index.html',
    sphere_project_pdf:'publication/workbench/reader-restoration-r1/projects/sphere-rigidity/project.pdf',
    sphere_project_json:'publication/workbench/reader-restoration-r1/projects/sphere-rigidity/project.json',
  };
  const protectedSource={};
  for(const [key,p] of Object.entries(protectedPaths)){
    const before=sha(execFileSync('git',['-C',root,'show',`${combinedPublicParent}:${p}`]));
    const after=sha(execFileSync('git',['-C',root,'show',`HEAD:${p}`]));
    need(before===after,'protected source changed '+key);
    protectedSource[key]=before;
  }
  const expectedPaths=git('diff','--name-only',combinedPublicParent,'HEAD').split('\n').filter(Boolean).sort();
  same(expectedPaths,combinedChangedPaths,'combined changed-path allowlist');
  need(sha(fs.readFileSync(path.join(root,'src/pages/index.astro')))==='e057b6fa314184d1db7d8d766a694cb593bc17ba5e4ae70676b5c32c1d2834a2','accepted Home source');
  for(const [name,expected] of Object.entries(siteIconSha256))need(sha(fs.readFileSync(path.join(root,'public',name)))===expected,'adopted favicon '+name);
  const successorProjects={};
  for(const slug of ['mankiewicz','sphere-rigidity']){
    const files=routes.routes[slug].file_identity;
    successorProjects[slug]={
      pdf:{path:`${integration.versioned_root}/projects/${slug}/project.pdf`,...files['project.pdf']},
      json:{path:`${integration.versioned_root}/projects/${slug}/project.json`,...files['project.json']},
    };
  }
  return {
    favicon_sha256:siteIconSha256,
    changed_paths:combinedChangedPaths,
    protected_source_sha256:protectedSource,
    card_identities:JSON.parse(fs.readFileSync(path.join(root,protectedPaths.card_identities),'utf8')),
    r1_public_artifacts:ledger.files,
    successor_projects:successorProjects,
    source_release:{tag:'v0.2.0',commit:integration.source_release_commit,tree:integration.source_release_tree},
  };
}
export function validateCombinedHomeFaviconAct(act,identity,deployment,today=tokyoDate()){
  need(act?.schema==='exact.owner-postpublic-update-act.v3'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.owner==='Ryotaro Tanaka','separate exact owner combined act required');
  need(act.update_kind===combinedKind,'combined update kind');
  same([act.old_commit,act.old_tree],[combinedPublicParent,combinedPublicTree],'combined public baseline');
  same([act.home_candidate_commit,act.home_candidate_tree],[homeCandidate,homeCandidateTree],'accepted Home intermediate');
  same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'combined successor identity');
  need(act.update_date_asia_tokyo===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'actual Asia/Tokyo update date');
  same([act.public_repository,act.canonical_origin],[deployment.public_repository,deployment.origin],'deployment identity');
  same(act.home_feature_links,[deployment.base+'mathlibannex/'],'exact Home feature link');
  same([act.mankiewicz_public_cards,act.sphere_rigidity_public_cards],[11,0],'public Card state');
  const expected=combinedHomeFaviconBindings();
  for(const [key,value] of Object.entries(expected))same(act[key],value,'combined binding '+key);
  return act;
}
export function postPublicUpdateGate(deployment){
  const identity=gitIdentity('FULL_LAUNCH');
  need(process.env.EXACT_UPDATE_ACT,'EXACT_UPDATE_ACT must identify a separate owner act');
  const act=JSON.parse(fs.readFileSync(path.resolve(process.env.EXACT_UPDATE_ACT),'utf8'));
  if(act.update_kind===combinedKind){
    need(git('rev-list','--count','HEAD')==='6'&&git('rev-parse','HEAD^')===homeCandidate&&git('rev-parse','HEAD^^')===combinedPublicParent&&git('rev-parse',homeCandidate+'^{tree}')===homeCandidateTree&&git('rev-parse',combinedPublicParent+'^{tree}')===combinedPublicTree&&git('rev-parse','HEAD^^^')===readerParent,'normal six-commit combined history');
    validateCombinedHomeFaviconAct(act,identity,deployment);
  }else if(act.update_kind==='MATHLIBANNEX_PROJECT_READER_EXPERIENCE_RESTORATION_R1'){
    need(git('rev-list','--count','HEAD')==='4'&&git('rev-parse','HEAD^')===readerParent&&git('rev-parse','HEAD^^')===parent&&git('rev-parse','HEAD^^^')===initial&&git('rev-parse',readerParent+'^{tree}')===readerParentTree&&git('rev-parse',parent+'^{tree}')===parentTree&&git('rev-parse',initial+'^{tree}')===initialTree,'normal four-commit public history');
    validateReaderRestorationAct(act,identity,deployment.origin,deployment.public_repository);
  }else{
    need(git('rev-list','--count','HEAD')==='3'&&git('rev-parse','HEAD^')===parent&&git('rev-parse','HEAD^^')===initial&&git('rev-parse',parent+'^{tree}')===parentTree&&git('rev-parse',initial+'^{tree}')===initialTree,'normal three-commit public history');
    const {manifest}=verifyPostPublic();
    validatePostPublicAct(act,identity,manifest,deployment.origin,deployment.public_repository);
  }
  return {act,imports:[],postpublic_update:true};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{postPublicUpdateGate({origin:process.env.EXACT_CANONICAL_ORIGIN||'https://exactmathematics.org',public_repository:process.env.EXACT_PUBLIC_REPOSITORY||'https://github.com/r-tanaka-math/exact-math'});console.log('AUTHORIZED_POSTPUBLIC_UPDATE_READY');}
  catch(e){console.error(e.message);process.exitCode=1;}
}

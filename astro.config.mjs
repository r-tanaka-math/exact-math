import {integrateNaimarkArxiv,finishNaimarkArxivOutput} from './scripts/naimark-arxiv-public-adapter.mjs';
import {defineConfig} from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {fullPublicProfile,integrateFullHP,finishFullHPOutput} from './scripts/full-hp-public-adapter.mjs';
import {auditOutput} from './scripts/distribution-policy.mjs';
import {integrateProjects} from './scripts/project-adapter.mjs';
import {finishOutput} from './scripts/rc4-output.mjs';
import {postPublicUpdateGate} from './scripts/postpublic-gate.mjs';
import {deploymentIdentity,gitIdentity,publicWording} from './scripts/deployment-identity.mjs';

const outputs=new Set(['dist-rc4','dist-rc4-base','dist-rc4-review','dist-rc4-review-base','dist-rc4-live','dist-rc4-live-base','dist-rc4-indexable','dist-rc4-indexable-base','dist-rc4-release','dist-rc4-public-qualification','dist-rc4-public-qualification-base']);
const out=process.env.EXACT_OUT||'dist-rc4';
const profile=process.env.EXACT_PROFILE||'PUBLIC_PREVIEW';
const mode=process.env.EXACT_FEEDBACK_MODE||'DISABLED_PRIVATE_PREVIEW';
const base=process.env.EXACT_BASE||'/';
if(!outputs.has(out)||!['PUBLIC_PREVIEW','LOCAL_REVIEW','INDEXABLE_QUALIFICATION','PUBLIC_RELEASE_QUALIFICATION','FULL_LAUNCH'].includes(profile)||!['DISABLED_PRIVATE_PREVIEW','LIVE_PUBLIC'].includes(mode))throw Error('Invalid build profile');
if((profile==='FULL_LAUNCH')!==(out==='dist-rc4-release'))throw Error('Release uses its isolated named output');
if((profile==='PUBLIC_RELEASE_QUALIFICATION')!==out.startsWith('dist-rc4-public-qualification'))throw Error('Public qualification uses its isolated named output');
if(profile==='PUBLIC_RELEASE_QUALIFICATION'&&mode!=='LIVE_PUBLIC')throw Error('Public qualification must exercise feedback configuration');
if(mode==='LIVE_PUBLIC'&&!out.includes('live')&&!publicWording(profile))throw Error('Form qualification output required');
const deployment=deploymentIdentity(profile,base);
let release=null;
const guard={name:'exact-public-launch-hardening',hooks:{
  'astro:build:start':()=>{
    if(publicWording(profile))gitIdentity(profile);
    if(profile==='FULL_LAUNCH')release=postPublicUpdateGate(deployment);
    const target=new URL('./'+out+'/',import.meta.url);
    if(fs.existsSync(target)&&fs.lstatSync(target).isSymbolicLink())throw Error('Linked output');
    fs.rmSync(target,{recursive:true,force:true});
    execFileSync(process.execPath,[fileURLToPath(new URL('./scripts/stage-assets.mjs',import.meta.url))],{stdio:'inherit'});
  },
  'astro:build:done':async ({dir})=>{
    const root=fileURLToPath(dir);
    auditOutput(root);
    integrateProjects(root,base,profile);
    if(release)for(const f of release.imports){const p=path.resolve(root,f.path);if(!p.startsWith(root)||fs.existsSync(p))throw Error('Imported route collision');fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(f.src,p)}
    if(fullPublicProfile(profile)){
      const current=release?.act?.update_kind==='EM_NAIMARK_ARXIV_CARD20_PUBLICATION_R1'||(profile==='PUBLIC_RELEASE_QUALIFICATION'&&process.env.EXACT_QUALIFICATION_BATCH==='EM_NAIMARK_ARXIV_CARD20_PUBLICATION_R1');
      if(current){await integrateNaimarkArxiv(root,base);finishNaimarkArxivOutput(root,deployment,profile,mode,release);}
      else {integrateFullHP(root,base);finishFullHPOutput(root,deployment,profile,mode,release);}
    }
    else finishOutput(root,deployment,profile,mode,release);
  },
}};
export default defineConfig({site:deployment.origin,integrations:[guard],output:'static',base,trailingSlash:'always',compressHTML:true,outDir:'./'+out,cacheDir:'./.astro/cache-'+out,build:{inlineStylesheets:'always'},vite:{cacheDir:'./.astro/vite',build:{sourcemap:false,assetsInlineLimit:0}},server:{host:'127.0.0.1'}});

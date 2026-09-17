import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const repo=fileURLToPath(new URL('../',import.meta.url));
const sha=/^[a-f0-9]{40}$/;
const fail=message=>{throw Error('Deployment identity: '+message)};
export const publicWording=profile=>profile==='FULL_LAUNCH'||profile==='PUBLIC_RELEASE_QUALIFICATION';

export function deploymentIdentity(profile,base=process.env.EXACT_BASE||'/'){
  if(!/^\/(?:[a-z0-9-]+\/)*$/.test(base))fail('invalid base');
  const publicProfile=publicWording(profile);
  const origin=process.env.EXACT_CANONICAL_ORIGIN||(publicProfile?'':'https://exactmathematics.org');
  let url;
  try{url=new URL(origin)}catch{fail('canonical origin required')}
  if(url.protocol!=='https:'||!url.hostname||url.username||url.password||url.search||url.hash||url.pathname!=='/'||url.origin!==origin)fail('canonical origin must be an HTTPS origin without path or credentials');
  const deploymentProfile=process.env.EXACT_DEPLOYMENT_PROFILE||(publicProfile?'':base==='/'?'ROOT':'SUBPATH');
  if(deploymentProfile!==(base==='/'?'ROOT':'SUBPATH'))fail('base and deployment profile disagree');
  const repository=process.env.EXACT_PUBLIC_REPOSITORY||null;
  if(publicProfile&&!/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository||''))fail('exact public repository identity required');
  if(publicProfile&&repository!=='https://github.com/r-tanaka-math/exact-math')fail('expected public repository is r-tanaka-math/exact-math');
  return {origin,base,deployment_profile:deploymentProfile,public_repository:repository,canonical_root:origin+base};
}

export function gitIdentity(profile){
  const commit=process.env.EXACT_SITE_REVISION||null,tree=process.env.EXACT_SITE_TREE||null;
  if(!publicWording(profile))return {commit:commit||'LOCAL_REVIEW',tree:tree||'LOCAL_REVIEW'};
  if(!sha.test(commit||'')||!sha.test(tree||''))fail('exact 40-character site commit and tree required');
  const git=(...args)=>execFileSync('git',['-c','safe.directory='+repo.replaceAll('\\','/').replace(/\/$/,''),'-C',repo,...args],{encoding:'utf8'}).trim();
  if(git('status','--porcelain')!=='')fail('public profile requires a clean checkout');
  if(commit!==git('rev-parse','HEAD')||tree!==git('rev-parse','HEAD^{tree}'))fail('site commit/tree do not match checkout');
  return {commit,tree};
}

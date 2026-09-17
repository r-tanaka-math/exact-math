export const RECEIPT_KEY='exact-feedback-once-r1';
export const fields=['category','project_or_page','locator','message','name','email'] as const;
export type Receipt={version:1; values:Record<typeof fields[number],string>;submittedAt:string;previousPath:string;demo:boolean};
export function previousPath():string {
 try{
  const previous=sessionStorage.getItem('exact-feedback-return-path');sessionStorage.removeItem('exact-feedback-return-path');
  if(previous){const u=new URL(previous,location.origin);if(u.origin===location.origin && u.pathname.startsWith(import.meta.env.BASE_URL) && !u.pathname.includes('/corrections/') && !u.search && !u.hash)return u.pathname;}
 }catch{}
 try{const u=new URL(document.referrer);if(u.origin===location.origin && u.pathname.startsWith(import.meta.env.BASE_URL) && !u.pathname.includes('/corrections/'))return u.pathname;}catch{}
 return import.meta.env.BASE_URL;
}
export function storeReceipt(receipt:Receipt):boolean {
 try{sessionStorage.removeItem(RECEIPT_KEY);sessionStorage.setItem(RECEIPT_KEY,JSON.stringify(receipt));return true;}catch{return false;}
}
export function consumeReceipt():Receipt|null {
 try{
  const raw=sessionStorage.getItem(RECEIPT_KEY);sessionStorage.removeItem(RECEIPT_KEY);
  if(!raw || raw.length>100000)return null;
  const r=JSON.parse(raw);if(r.version!==1||typeof r.demo!=='boolean'||typeof r.submittedAt!=='string'||!Number.isFinite(Date.parse(r.submittedAt)))return null;
  if(Math.abs(Date.now()-Date.parse(r.submittedAt))>30*60*1000)return null;
  if(!r.values||fields.some(k=>typeof r.values[k]!=='string'))return null;
  const u=new URL(r.previousPath,location.origin);if(u.origin!==location.origin||!u.pathname.startsWith(import.meta.env.BASE_URL)||u.search||u.hash)return null;
  return r as Receipt;
 }catch{return null;}
}

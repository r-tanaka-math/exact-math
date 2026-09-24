// Reuse the accepted display-only GNU FreeFont fallback. No font binary is committed.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';
const hash=b=>createHash('sha256').update(b).digest('hex');
const fontHash='658563c732eafdc851de2b3f38b27d0afcde5674b2f93440971b9693438c6494';
const archiveHash='7c85baf1bf82a1a1845d1322112bc6ca982221b484e3b3925022e25b5cae89af';
const filename='FreeSerif-20120503.ttf';
const need=(v,m)=>{if(!v)throw Error('EXACT_FONT_REFUSED: '+m)};
function member(zip){
 // Only the pinned archive is parsed; no archive path is ever extracted to disk.
 need(zip.length===6076197&&hash(zip)===archiveHash,'official archive identity');
 let end=-1;for(let i=zip.length-22;i>=Math.max(0,zip.length-65557);i--)if(zip.readUInt32LE(i)===0x06054b50){end=i;break;}
 need(end>=0,'ZIP directory');let pos=zip.readUInt32LE(end+16),matches=[];
 for(let i=0;i<zip.readUInt16LE(end+10);i++){
  need(zip.readUInt32LE(pos)===0x02014b50,'ZIP entry');
  const len=zip.readUInt16LE(pos+28),extra=zip.readUInt16LE(pos+30),comment=zip.readUInt16LE(pos+32);
  const name=zip.subarray(pos+46,pos+46+len).toString('utf8');
  if(name==='freefont-20120503/FreeSerif.ttf'){
   need(zip.readUInt16LE(pos+10)===8&&!(zip.readUInt16LE(pos+8)&1),'compression/encryption');
   const local=zip.readUInt32LE(pos+42);need(zip.readUInt32LE(local)===0x04034b50,'ZIP local entry');
   const start=local+30+zip.readUInt16LE(local+26)+zip.readUInt16LE(local+28);
   matches.push(inflateRawSync(zip.subarray(start,start+zip.readUInt32LE(pos+20)),{maxOutputLength:3303588}));
  }
  pos+=46+len+extra+comment;
 }
 need(matches.length===1,'unique pinned font');return matches[0];
}
export async function installSupplementalFont(output){
 let font;
 const cache=process.env.EXACT_FONT_CACHE?path.join(process.env.EXACT_FONT_CACHE,filename):null;
 if(cache&&fs.existsSync(cache)){need(!fs.lstatSync(cache).isSymbolicLink(),'linked cache');font=fs.readFileSync(cache);}
 else {const response=await fetch('https://ftp.gnu.org/gnu/freefont/freefont-ttf-20120503.zip',{signal:AbortSignal.timeout(60000)});need(response.ok,'official font download');font=member(Buffer.from(await response.arrayBuffer()));}
 need(font.length===3303588&&hash(font)===fontHash,'accepted font identity');
 for(const relative of ['mathlibannex/assets','mathlibannex/projects/assets']){const dest=path.join(output,relative);fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,filename),font);}
 console.log('PASS_PINNED_FREEFONT_DISPLAY_ASSET');
}

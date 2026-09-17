import {boundary} from '../../lib/content-terms';
export const GET=()=>new Response(JSON.stringify(boundary,null,2)+'\n',{headers:{'Content-Type':'application/json; charset=utf-8'}});

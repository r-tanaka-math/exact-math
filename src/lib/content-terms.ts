import fs from 'node:fs';
import pending from '../data/license-boundary.json';
import {publicWording,qualification,published} from './build-profile';

export const termsActive = publicWording;
const act = published ? JSON.parse(fs.readFileSync(process.env.EXACT_RELEASE_ACT!, 'utf8')) : null;
const date = act?.publication_date || (qualification ? process.env.EXACT_QUALIFICATION_DATE : null);
if(qualification && !/^\d{4}-\d{2}-\d{2}$/.test(date||''))throw Error('Exact qualification date required');
export const boundary = termsActive ? {
  ...pending,
  status:published?'PUBLIC_EFFECTIVE':'PUBLIC_WORDING_QUALIFICATION_ONLY',
  display_state:'Content terms',
  effective_now:published,
  effective_date:published?date:null,
  qualification_date:qualification?date:null,
  public_release:published,
  indexing:published?'INDEXABLE':'NOINDEX_QUALIFICATION',
  legal_effect:published?'PUBLIC_EFFECTIVE':'NONE_QUALIFICATION',
  layers:pending.layers.map(layer=>layer.id==='public_content'?{...layer,treatment:'All rights reserved, with the personal, educational and scholarly-use permissions stated below.'}:layer),
} : pending;

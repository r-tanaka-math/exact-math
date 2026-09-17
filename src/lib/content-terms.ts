import pending from '../data/license-boundary.json';
import {publicWording} from './build-profile';

export const termsActive = publicWording;
// The initial 17 September 2026 terms are already effective on the live site.
// This child commit neither re-enacts nor changes that publication.
const date = '2026-09-17';
export const boundary = termsActive ? {
  ...pending,
  status:'PUBLIC_EFFECTIVE',
  display_state:'Content terms',
  effective_now:true,
  effective_date:date,
  qualification_date:null,
  public_release:true,
  indexing:'INDEXABLE',
  legal_effect:'PUBLIC_EFFECTIVE',
  layers:pending.layers.map(layer=>layer.id==='public_content'?{...layer,treatment:'All rights reserved, with the personal, educational and scholarly-use permissions stated below.'}:layer),
} : pending;

// Scholar-Lite's shared SITE configuration, adapted to the accepted Exact data.
import input from './data/site.json';
import assets from './data/assets.json';
import { assetRegistrySchema, siteSchema } from './data/schema';
import {publicWording,exactSiteCommit} from './lib/build-profile';
const parsed = siteSchema.parse({...input,feedback:{...input.feedback,mode:process.env.EXACT_FEEDBACK_MODE || input.feedback.mode}});
export const SITE = {
  ...parsed,
  revision: publicWording ? exactSiteCommit : parsed.revision,
  preview_only: publicWording ? false : parsed.preview_only,
  public_release: publicWording,
  preview_notice: publicWording ? 'Public presentation' : parsed.preview_notice,
  annex: {...parsed.annex,
    status: publicWording ? 'MathlibAnnex v0.2.0 source and the selected Project views are available. Public Declaration Cards: 0. Brief↔Lean correspondence and full human mathematical verification remain incomplete.' : parsed.annex.status,
  },
};
export const PREVIEW_ASSETS = assetRegistrySchema.parse(assets);

// Scholar-Lite's shared SITE configuration, adapted to the accepted Exact data.
import input from './data/site.json';
import {reviewDisplayProjection} from './lib/review-display-projection';
import assets from './data/assets.json';
import { assetRegistrySchema, siteSchema } from './data/schema';
import {publicWording,exactSiteCommit,fullHP} from './lib/build-profile';
const parsed = reviewDisplayProjection(siteSchema.parse({...input,feedback:{...input.feedback,mode:process.env.EXACT_FEEDBACK_MODE || input.feedback.mode}}));
export const SITE = {
  ...parsed,
  revision: publicWording ? exactSiteCommit : parsed.revision,
  preview_only: publicWording ? false : parsed.preview_only,
  public_release: publicWording,
  preview_notice: fullHP && !publicWording ? 'Private full-site candidate · Publication not authorized' : publicWording ? 'Public presentation' : parsed.preview_notice,
  home: {...parsed.home, annex_text: fullHP ? 'MathlibAnnex connects reusable Lean declarations with Declaration Cards, exact source views, and four guided Project overviews.' : parsed.home.annex_text},
  research: {...parsed.research, notice: fullHP ? 'Sphere Rigidity Draft R2 and the Naimark Brief Report and Prior-Art Search are available below. Each project records the exact scope of review and correspondence.' : parsed.research.notice},
  annex: {...parsed.annex,
    intro: fullHP ? 'MathlibAnnex is a shared library of reusable Lean declarations. Source v0.4.0 is public. Four Projects connect to a whole-library Catalog of 44 Declaration Cards.' : parsed.annex.intro,
    status: fullHP && publicWording ? 'Source v0.4.0, four Projects, and 44 approved Declaration Card expositions are public. Existing content terms remain unchanged.' : fullHP ? 'Source v0.4.0 is public. This private candidate contains four Projects and 44 approved Declaration Card expositions. Candidate publication is pending; the official public Catalog remains unchanged.' : publicWording ? 'MathlibAnnex v0.2.0 source and the selected Project views are available. Public Declaration Cards: 11 (Mankiewicz); Sphere Rigidity currently has 0 public Cards. Brief↔Lean correspondence and full human mathematical verification remain incomplete.' : parsed.annex.status,
  },
};
export const PREVIEW_ASSETS = assetRegistrySchema.parse(assets);

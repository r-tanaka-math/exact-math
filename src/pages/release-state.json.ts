import { SITE } from '../config';
import boundary from '../data/license-boundary.json';
export const GET = () => new Response(JSON.stringify({schema:'exact.site-release-state.v1',revision:SITE.revision,publication_state:'NOT_PUBLISHED',candidate_state:'PUBLICATION_CANDIDATE',indexing:'NOINDEX',content_terms:boundary.status,effective_now:false,feedback_mode:SITE.feedback.mode,formspree_automated_live_posts:0},null,2)+'\n',{headers:{'Content-Type':'application/json'}});

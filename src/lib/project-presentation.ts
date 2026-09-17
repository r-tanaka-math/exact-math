import type { CollectionEntry } from 'astro:content';
import copy from '../data/project-copy.json';
import {publicWording,exactSiteCommit} from './build-profile';
// Display text only: the accepted mathematical record, dates, codes and artifact bytes remain untouched.
export function presentProject(entry: CollectionEntry<'research'>): CollectionEntry<'research'> {
  const result = structuredClone(entry);
  if (entry.id !== 'sr') return result;
  for (const [path, text] of Object.entries(copy.sr)) {
    const parts = path.split('.');
    let target: any = result.data;
    for (const key of parts.slice(0,-1)) target = target[key];
    target[parts.at(-1)!] = text;
  }
  if (publicWording) {
    const p: any = result.data;
    p.website_revision = exactSiteCommit;
    p.first_publication = '2026-09-17';
    p.website_updated = '2026-09-17';
    p.summary = 'The preliminary Brief Report presents the mathematical statements and proofs as a public PDF. Its mathematical review, formal source, and explanatory materials have separate records.';
    p.statuses[4].code = 'PUBLIC_COMPANION_VIEW';
    p.statuses[4].value = 'Research Companion available';
    p.statuses[4].detail = 'The progressive Research Companion is available in HTML, PDF and JSON. Its 467 exact declarations are not provisional Cards; public Declaration Cards remain zero.';
    p.statuses[5].code = 'PUBLIC_BRIEFING';
    p.statuses[5].value = 'Preliminary Brief Report available';
    p.statuses[5].detail = 'The preliminary Brief Report is available as a PDF. Full human mathematical verification and Brief↔Lean semantic correspondence remain incomplete. Conventional paper, arXiv and DOI milestones remain separate.';
    p.artifacts[0].state = 'Available as a public preliminary PDF';
    p.artifacts[0].exposure = 'PUBLIC_BRIEF_REPORT';
    p.artifacts[3].state = 'Project HTML, PDF and JSON available';
    p.notes[2].text = 'The MathlibAnnex v0.2.0 formal source is public. The progressive Research Companion is available here in HTML, PDF and JSON. Public Declaration Cards remain zero, and correspondence between the Brief Report and Lean source remains pending.';
    p.updates[1].text = 'The 22-page preliminary Brief Report and conventional manuscript incorporated the same local corrections. Preparation alone did not establish full human verification.';
    p.updates[3].title = 'Website record prepared';
    p.updates[3].text = 'Initial presentation and status fields were prepared. This entry is not a mathematical review or a new Lean build.';
  }
  return result;
}

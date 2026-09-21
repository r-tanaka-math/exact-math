import publication from '../../publication/full-hp/metadata.json';

// HP-owned metadata overlay. The accepted mathematical prose and review boundaries stay intact.
export function publicProject(input: any, id: string): any {
  const p = structuredClone(input), sphere = id === 'sr';
  const date = publication.publication_date;
  p.visibility = 'PUBLIC';
  p.website_updated = date;
  p.first_publication = sphere ? '2026-09-17' : date;
  p.stage = {code: 'PUBLIC_BRIEFING', label: 'Brief report available'};
  const status = p.statuses.find((s: any) => s.id === 'publication');
  status.code = 'PUBLIC_BRIEFING';
  status.value = sphere ? 'Draft R2 available' : 'Draft R1 available';
  status.detail = sphere
    ? `Draft R2 published ${date}. Draft R1 was first published on 17 September 2026.`
    : `Brief Report Draft R1 and Prior-Art Search R1 first published ${date}.`;
  const formal = p.statuses.find((s: any) => s.id === 'lean');
  formal.code = 'PUBLIC_SOURCE_V0_4_0';
  p.statuses.find((s: any) => s.id === 'exposition').code = 'PUBLIC_COMPANION_VIEW';
  for (const artifact of p.artifacts) {
    const selected = publication.reports.find(r => '/' + r.path === artifact.url);
    if (selected) Object.assign(artifact, {state: 'Available as a public PDF', exposure: 'PUBLIC_REPORT', bytes: selected.bytes, sha256: selected.sha256});
    if (artifact.id === 'reading') artifact.state = 'Companion HTML, PDF and JSON available below';
  }
  for (const update of p.updates) {
    update.text = update.text.replace('Brief Report Draft R1 and Prior-Art Search R1 are private candidates.', 'Brief Report Draft R1 and Prior-Art Search R1 were prepared for review.').replace('publication dates are pending.', 'preparation did not constitute publication.').replace('Revision publication date pending.', 'This entry records preparation before publication.');
  }
  p.updates.unshift({date, kind: 'WEBSITE_EDIT', title: sphere ? 'Draft R2 published' : 'First public report editions', text: sphere
    ? 'Draft R2 refines citations and attribution and clarifies notation. No mathematical statement, hypothesis, conclusion, or proof argument was changed. Draft R1 and its publication date are preserved.'
    : 'Brief Report Draft R1 and Prior-Art Search R1 are public. The search cutoff remains 20 September 2026. Publication adds no new mathematical review or whole-document correspondence approval.'});
  return p;
}

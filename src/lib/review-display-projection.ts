// Current website display only. Immutable mathematical/legacy inputs retain their original bytes.
const replacements: [string,string][] = [
  [
    "The public MathlibAnnex v0.4.0 source includes this Project. Its recorded qualification is separate from human review and Brief Report correspondence.",
    "The public MathlibAnnex v0.4.0 source includes this Project. Its recorded qualification is separate from manuscript correspondence."
  ],
  [
    "Recorded source qualification is separate from manuscript correspondence and human review.",
    "Recorded source qualification is separate from manuscript correspondence."
  ],
  [
    "Its formal-source and human-verification records must be displayed separately.",
    "Its formal-source and manuscript-correspondence records are distinct."
  ],
  [
    "The proposed construction and its human-verification, formal-source and correspondence records are distinct.",
    "The proposed construction, its formal source, and manuscript-correspondence records are distinct."
  ],
  [
    "The earlier Brief Report is preserved as a preliminary, AI-assisted record. The subsequent arXiv paper and the author's proof-review record are listed separately below.",
    "The earlier Brief Report is preserved as a preliminary, AI-assisted record. The subsequent arXiv paper is listed below."
  ],
  [
    "Historical human-review record for Brief Report Draft R1: Human verification incomplete. The later author-review record does not retroactively certify every sentence of this Brief or all 14 correspondence groups.",
    "Brief Report Draft R1 remains available as a preliminary, AI-assisted record. Targeted correspondence records do not constitute approval of all 14 correspondence groups."
  ],
  [
    "This is a preliminary, AI-assisted manuscript. Full human verification of this report version has not been completed.",
    "This is a preliminary, AI-assisted manuscript."
  ],
  [
    "The brief report contains the statements, proofs, necessary notation, and references. Its footer reads “AI-assisted manuscript · Human verification incomplete”. Subsequent Lean, library, and paper milestones belong to this project record; they do not require a new report edition unless the report itself changes.",
    "The brief report contains the statements, proofs, necessary notation, and references. Published editions retain their original version-specific notices. Subsequent Lean, library, and paper milestones belong to this project record; they do not require a new report edition unless the report itself changes."
  ],
  [
    "The research direction and revisions were developed through human–AI dialogue. AI contributed substantially to proof development and manuscript preparation. This description does not imply that full human verification has been completed.",
    "The research direction and revisions were developed through human–AI dialogue. AI contributed substantially to proof development and manuscript preparation. This description does not change the stated scope of the available evidence."
  ],
  [
    "separately reports the author's proof review and the arXiv preprint; neither is an independent proof audit.",
    "links the arXiv preprint and the available formalization records; preprint availability is not journal peer review or an independent proof audit."
  ],
  [
    "Human review and conventional papers may come before or after formalization. Each is tracked independently, and any claim of completion must refer to matching versions.",
    "Conventional papers and formalization may be developed in either order. Their versions and stated scope are recorded separately."
  ],
  [
    "A report, its formal source, and their correspondence are separate records. Check the project page for the version, date, and scope of each review. An AI-assisted review of a written argument does not establish human verification.",
    "A report, its formal source, and their correspondence are separate records. Consult the linked documents and exact source records for their versions and scope. A formal check does not, by itself, establish correspondence with every step of a manuscript."
  ],
  [
    "Which briefing, paper, code, or reading material is actually available. Permission to publish an unreviewed result does not turn it into a reviewed result.",
    "Which briefing, preprint, journal article, code, or reading material is available, with its version and publication links. Preprint availability and journal publication are distinct records; neither is represented here as a guarantee of mathematical correctness."
  ],
  [
    "The role of AI and the extent of human review should be recorded for each result rather than hidden behind a general label.",
    "The role of AI should be stated for each work. Papers identify their authors' contributions and responsibility; the site links the available manuscripts, formal sources, and correspondence records."
  ],
  [
    "The standard label is “AI-assisted manuscript”; the human-verification notice describes the report version.",
    "The standard label is “AI-assisted manuscript”; published editions retain their original version-specific notices."
  ],
  [
    "Source qualification, exposition review, author review and independent proof verification remain distinct.",
    "Source qualification and source-exposition correspondence are distinct from journal peer review or an independent proof audit."
  ],
  [
    "Naimark review record",
    "Naimark research record"
  ],
  [
    "Keep human review, formal checking, and statement alignment visible as separate records. A new version should say exactly what changed.",
    "Keep formal checking and statement alignment visible as separate records. A new version should say exactly what changed."
  ],
  [
    "Human review, formal checking, and statement alignment are shown separately.",
    "Formal checking and statement alignment are shown separately."
  ]
];
export function reviewDisplayProjection<T>(input:T):T {
  function visit(value:any):any {
    if(typeof value==='string')return replacements.reduce((s,[a,b])=>s.replaceAll(a,b),value);
    if(Array.isArray(value))return value.filter(x=>!(x && typeof x==='object' && x.id==='human')).map(visit);
    if(value && typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,visit(v)]));
    return value;
  }
  return visit(input);
}

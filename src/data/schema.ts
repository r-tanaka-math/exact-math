// Explicit data shape migrated from APP/content/site.json. Review-only contract.
import { z } from 'astro:content';
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const sha256 = z.string().regex(/^[a-f0-9]{64}$/);
const projectId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const siteSchema = z.object({
"schema": z.literal("exact.site-draft.v1"),
"language": z.literal("en"),
"revision": z.literal("RC5"),
"feedback": z.object({mode:z.enum(["DISABLED_PRIVATE_PREVIEW","LIVE_PUBLIC"]),form_id:z.literal("mrpgwrbd"),endpoint:z.literal("https://formspree.io/f/mrpgwrbd"),profile_version:z.literal("exact-feedback-r1")}).strict(),
"preview_only": z.literal(true),
"public_release": z.literal(false),
"content_date": z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
"name": z.literal("Exact Mathematics with AI"),
"subtitle": z.literal("Mathematical discovery, formal verification, and human understanding."),
"introduction": z.literal("An independent research initiative exploring mathematics with AI. We share preliminary results, develop reusable formal mathematics, and build explanations that help readers understand proofs. Each project records its verification status and how that status changes over time."),
"exact_meaning": z.literal("“Exact” describes our commitment to explicit statements, traceable reasoning, and transparent verification—not a claim that every preliminary result is already correct."),
"owner": z.object({
"display_name": z.literal("Ryotaro Tanaka"),
"title": z.literal("Associate Professor"),
"unit": z.literal("Institute of Arts and Sciences"),
"institution": z.literal("Tokyo University of Science"),
"institutional_profile": z.literal("https://www.tus.ac.jp/ridai/doc/ji/RIJIA01Detail.php?act=&diu=6fd5&kin=ken&pri=en"),
"contact_route": z.literal("/corrections/"),
"independence_notice": z.literal("The affiliation is provided for identification only. Exact Mathematics with AI is an independent research initiative and is not an official website or publication of Tokyo University of Science."),
"publish_direct_email": z.literal(false),
"authority": z.literal("OWNER_PROVIDED_FINAL_FOR_SITE_IDENTITY")
}).strict(),
"navigation": z.array(z.object({
"key": z.enum(['home','research','annex','about']),
"label": z.string().min(1)
}).strict()),
"preview_notice": z.literal("Local review · Not yet public"),
"home": z.object({
"eyebrow": z.string().min(1),
"side_title": z.string().min(1),
"side_text": z.string().min(1),
"research_title": z.string().min(1),
"research_intro": z.string().min(1),
"pillars": z.array(z.object({
"number": z.string().min(1),
"title": z.string().min(1),
"text": z.string().min(1)
}).strict()),
"annex_title": z.string().min(1),
"annex_text": z.string().min(1),
"principle_title": z.string().min(1),
"principle_text": z.string().min(1)
}).strict(),
"research": z.object({
"eyebrow": z.string().min(1),
"title": z.string().min(1),
"intro": z.string().min(1),
"notice": z.string().min(1)
}).strict(),
"annex": z.object({
"eyebrow": z.string().min(1),
"title": z.string().min(1),
"lead": z.string().min(1),
"intro": z.string().min(1),
"status": z.string().min(1),
"sections": z.array(z.object({
"id": z.string().min(1),
"title": z.string().min(1),
"paragraphs": z.array(z.string().min(1))
}).strict()),
"work": z.array(z.object({
"title": z.string().min(1),
"text": z.string().min(1)
}).strict()),
"closing": z.string().min(1)
}).strict(),
"about": z.object({
"eyebrow": z.string().min(1),
"title": z.string().min(1),
"lead": z.string().min(1),
"sections": z.array(z.object({
"id": z.string().min(1),
"title": z.string().min(1),
"paragraphs": z.array(z.string().min(1))
}).strict()),
"contact_notice": z.string().min(1)
}).strict(),
"verification": z.object({
"eyebrow": z.string().min(1),
"title": z.string().min(1),
"lead": z.string().min(1),
"axes": z.array(z.object({
"id": z.enum(['novelty','human','lean','alignment','exposition','publication']),
"title": z.string().min(1),
"text": z.string().min(1)
}).strict()).length(6).refine(items => new Set(items.map(item => item.id)).size === 6, 'Each verification guide axis must occur exactly once'),
"order_title": z.string().min(1),
"order_text": z.string().min(1),
"preview_title": z.string().min(1),
"preview_text": z.string().min(1)
}).strict()
}).strict();

export const assetRegistrySchema = z.object({
  schema: z.literal('exact.preview-assets.v1'),
  scope: z.literal('LOCAL_PREVIEW_ONLY'),
  assets: z.array(z.object({
    project_id: projectId,
    artifact_id: projectId,
    package_path: z.string().regex(/^ASSETS\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/),
    logical_path: z.string().regex(/^(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/),
    url: z.string().regex(/^\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/),
    bytes: z.number().int().positive(),
    sha256,
    mime: z.literal('application/pdf'),
    version: z.string().min(1),
    prepared_date: date,
    pages: z.number().int().positive().nullable(),
    source_archive: z.string().min(1),
    source_member: z.string().min(1),
  }).strict()).min(1).superRefine((assets, context) => {
    const keys = assets.map(asset => `${asset.project_id}:${asset.artifact_id}`);
    const paths = assets.map(asset => asset.logical_path);
    if (new Set(keys).size !== keys.length) context.addIssue({ code: 'custom', message: 'Duplicate project/artifact asset key' });
    if (new Set(paths).size !== paths.length) context.addIssue({ code: 'custom', message: 'Duplicate logical asset path' });
    assets.forEach((asset, index) => {
      if (asset.url !== `/${asset.logical_path}`) context.addIssue({ code: 'custom', path: [index, 'url'], message: 'Asset URL and logical path differ' });
    });
  }),
  publication_authorized: z.literal(false),
  public_release_date: z.null(),
}).strict();

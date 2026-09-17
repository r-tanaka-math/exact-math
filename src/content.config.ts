// Adapted from Scholar-Lite's defineCollection + glob + z architecture (MIT).
// Project records are typed independently of any one project identifier.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const text = z.string().min(1);
const date = text.regex(/^\d{4}-\d{2}-\d{2}$/);
const projectId = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const sha256 = text.regex(/^[a-f0-9]{64}$/);
const privateAssetUrl = text
  .regex(/^\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/)
  .refine(value => !value.split('/').includes('..'), 'Asset URL must not traverse directories');
const axis = z.enum(['novelty', 'human', 'lean', 'alignment', 'exposition', 'publication']);
const statusCode = z.enum([
  'DOCUMENTED_BOUNDED_SEARCH',
  'HUMAN_VERIFICATION_INCOMPLETE',
  'PRIVATE_BUILD_PASSED_HISTORY',
  'PUBLIC_SOURCE_V0_2_0',
  'REPORT_ALIGNMENT_PENDING',
  'NOT_RELEASED',
  'LOCAL_COMPANION_REVIEW',
  'PRIVATE_BRIEFING_PREVIEW',
  'PUBLIC_COMPANION_VIEW',
  'PUBLIC_BRIEFING',
]);
const expectedStatusCode: Record<z.infer<typeof axis>, z.infer<typeof statusCode>> = {
  novelty: 'DOCUMENTED_BOUNDED_SEARCH',
  human: 'HUMAN_VERIFICATION_INCOMPLETE',
  lean: 'PUBLIC_SOURCE_V0_2_0',
  alignment: 'REPORT_ALIGNMENT_PENDING',
  exposition: 'LOCAL_COMPANION_REVIEW',
  publication: 'PRIVATE_BRIEFING_PREVIEW',
};
const status = z.object({
  id: axis,
  label: text,
  code: statusCode,
  value: text,
  detail: text,
  tone: z.enum(['neutral', 'pending', 'recorded']),
  source_refs: z.array(text).optional(),
}).strict();
const availableArtifact = z.object({
  id: projectId,
  label: text,
  kind: text,
  state: text,
  url: privateAssetUrl,
  version: text,
  sha256,
  bytes: z.number().int().positive(),
  pages: z.number().int().positive().nullable(),
  mime: z.literal('application/pdf'),
  prepared_date: date,
  exposure: z.literal('PRIVATE_PREVIEW'),
  action_label: text,
}).strict();
const unavailableArtifact = z.object({
  id: projectId,
  label: text,
  kind: text,
  state: text,
  url: z.null(),
  version: z.null(),
}).strict();

export const projectSchema = z.object({
  schema: z.literal('exact.project-preview.v2'),
  id: projectId,
  title: text,
  long_title: text,
  category: text,
  short_description: text,
  visibility: z.literal('PRIVATE_PREVIEW'),
  website_revision: z.literal('RC5'),
  website_updated: date,
  first_publication: z.null(),
  briefing_version: text,
  mathematical_review_date: z.null(),
  stage: z.object({ code: z.literal('BRIEFING_PREVIEW_READY'), label: text }).strict(),
  summary: text,
  claim: z.object({
    label: text,
    text,
    qualifier: text,
    preview_note: text,
    source_refs: z.array(text),
    status: z.literal('PRELIMINARY_MANUSCRIPT_CLAIM'),
  }).strict(),
  statuses: z.array(status).length(6).superRefine((items, context) => {
    if (new Set(items.map(item => item.id)).size !== 6) {
      context.addIssue({ code: 'custom', message: 'Each verification axis must occur exactly once' });
    }
    for (const [index, item] of items.entries()) {
      if (item.code !== expectedStatusCode[item.id]) {
        context.addIssue({ code: 'custom', path: [index, 'code'], message: `Unexpected code for ${item.id}` });
      }
    }
  }),
  artifacts: z.array(z.union([availableArtifact, unavailableArtifact])).refine(items => items.every(item => item.id !== 'briefing-source'), 'Manuscript source is not a website artifact'),
  notes: z.array(z.object({ title: text, text }).strict()),
  updates: z.array(z.object({
    date,
    kind: z.enum(['WEBSITE_EDIT', 'DOCUMENT_PREPARED', 'AI_TEXTUAL_REVIEW']),
    title: text,
    text,
  }).strict()),
  ai_textual_review: z.object({
    kind: z.literal('AI_TEXTUAL_REVIEW'),
    date,
    scope: text,
    full_human_verification: z.literal(false),
    new_lean_build: z.literal(false),
    full_formal_alignment_audit: z.literal(false),
    mathematical_certification: z.literal(false),
  }).strict().optional(),
}).strict().superRefine((project, context) => {
  const briefing = project.artifacts.find(artifact => artifact.id === 'briefing');
  if (briefing && project.briefing_version !== briefing.version) {
    context.addIssue({ code: 'custom', path: ['briefing_version'], message: 'Briefing version must match the briefing artifact' });
  }
});

const projectLoader = glob({ pattern: '**/*.json', base: './src/content/projects' });
const research = defineCollection({
  loader: {
    ...projectLoader,
    async load(context) {
      // A build must not resurrect a deleted final JSON record from Astro's store.
      context.store.clear();
      await projectLoader.load(context);
    },
  },
  schema: projectSchema,
});

export const collections = { research };

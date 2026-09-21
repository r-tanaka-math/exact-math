import { getCollection } from 'astro:content';
import { presentProject } from './project-presentation';
export const projectRecords = async () => (await getCollection('research'))
  .filter(entry => entry.id !== 'naimark-problem' || ['FULL_HP_PRIVATE', 'FULL_LAUNCH', 'PUBLIC_RELEASE_QUALIFICATION'].includes(process.env.EXACT_PROFILE || ''))
  .filter(entry => !(process.env.EXACT_OMIT_DRAFTS || '').split(',').includes(entry.id))
  .sort((a, b) => a.id.localeCompare(b.id)).map(presentProject);

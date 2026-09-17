export const pagePaths = { home: '', research: 'research/', annex: 'mathlibannex/', about: 'about/', verification: 'verification/', corrections: 'corrections/', licensing: 'licensing/', received: 'corrections/received/', demo: 'corrections/demo/', notfound: '404.html' } as const;
export type PageKey = keyof typeof pagePaths;
const omitted = new Set((process.env.EXACT_OMIT_DRAFTS || '').split(','));
export const pageEnabled = (key: PageKey) => key === 'home' || key === 'notfound' || !omitted.has(key);
export const pageHref = (key: PageKey) => pageEnabled(key) ? `${import.meta.env.BASE_URL}${pagePaths[key]}` : null;
export const projectHref = (id: string) => `${import.meta.env.BASE_URL}research/${encodeURIComponent(id === 'sr' ? 'sphere-rigidity' : id)}/`;
export const artifactHref = (url: string) => {
  if (!/^\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/.test(url) || url.split('/').includes('..')) {
    throw new Error(`Invalid private artifact URL: ${url}`);
  }
  return `${import.meta.env.BASE_URL}${url.slice(1)}`;
};

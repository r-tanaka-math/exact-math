export const buildProfile = process.env.EXACT_PROFILE || 'PUBLIC_PREVIEW';
export const publicWording = buildProfile === 'FULL_LAUNCH' || buildProfile === 'PUBLIC_RELEASE_QUALIFICATION';
export const qualification = buildProfile === 'PUBLIC_RELEASE_QUALIFICATION';
export const published = buildProfile === 'FULL_LAUNCH';
export const exactSiteCommit = publicWording ? process.env.EXACT_SITE_REVISION! : 'LOCAL_REVIEW';
export const exactSiteTree = publicWording ? process.env.EXACT_SITE_TREE! : 'LOCAL_REVIEW';

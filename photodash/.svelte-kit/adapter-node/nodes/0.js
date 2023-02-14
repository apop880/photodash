import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-33cfb001.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-33cfb001.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js"];
export const stylesheets = [];
export const fonts = [];

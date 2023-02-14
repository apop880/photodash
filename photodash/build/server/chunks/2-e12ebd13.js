import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const load = async () => {
  let configurations = await prisma.configuration.findMany({ select: { uid: true, name: true } });
  return { configurations };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
const component = async () => (await import('./_page.svelte-9bdafa92.js')).default;
const file = '_app/immutable/components/pages/_page.svelte-94d19882.js';
const imports = ["_app/immutable/components/pages/_page.svelte-94d19882.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/Stack-756f318e.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js","_app/immutable/chunks/AppShell-cfa6c1e0.js","_app/immutable/chunks/apistore-9577ccf3.js","_app/immutable/chunks/stores-3fa92a4b.js","_app/immutable/chunks/singletons-99afe59e.js","_app/immutable/chunks/Button-b0c24815.js"];
const stylesheets = ["_app/immutable/assets/Button-d59859da.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, stylesheets };
//# sourceMappingURL=2-e12ebd13.js.map

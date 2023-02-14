import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const load = async ({ params }) => {
  let body = await prisma.configuration.findFirst({ where: { uid: params.uid } });
  return { configuration: body };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
const component = async () => (await import('./_page.svelte-1844b532.js')).default;
const file = '_app/immutable/components/pages/_uid_/_page.svelte-f41a4aa1.js';
const imports = ["_app/immutable/components/pages/_uid_/_page.svelte-f41a4aa1.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/apistore-9577ccf3.js","_app/immutable/chunks/stores-3fa92a4b.js","_app/immutable/chunks/singletons-99afe59e.js","_app/immutable/chunks/AppShell-cfa6c1e0.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js"];
const stylesheets = ["_app/immutable/assets/_page-f6d9c183.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, stylesheets };
//# sourceMappingURL=3-7631073f.js.map

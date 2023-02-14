import { p as prisma } from './prisma-68db7c66.js';
import { r as redirect } from './index-3fb25cb5.js';
import '@prisma/client';

const load = async ({ route }) => {
  const baseSettings = await prisma.baseSettings.findFirst();
  if (!baseSettings && route.id !== "/settings") {
    throw redirect(302, "/settings");
  }
  return { baseSettings };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-dedcf202.js')).default;
const file = '_app/immutable/components/pages/_layout.svelte-33cfb001.js';
const imports = ["_app/immutable/components/pages/_layout.svelte-33cfb001.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js"];
const stylesheets = [];
const fonts = [];

export { component, file, fonts, imports, index, _layout_server_ts as server, stylesheets };
//# sourceMappingURL=0-90bed0dd.js.map

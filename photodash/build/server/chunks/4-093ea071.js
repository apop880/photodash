import './apistore-d100c5d7.js';
import { r as readable } from './index2-2ab0d1d1.js';
import './index3-4c4d02a4.js';
import { p as prisma } from './prisma-68db7c66.js';

const tokenStore = readable("", function start(set) {
  return function stop() {
  };
});

const load$1 = async ({ data, fetch, parent }) => {
  return { ...data, entities: [] };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load$1
});

const load = async ({ params }) => {
  const configuration = await prisma.configuration.findFirst({ where: { uid: params.uid ?? "new" } }) ?? { name: "", backgroundMusicFile: "" };
  return { configuration };
};
const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const name = data.get("name");
    const weatherEntity = data.get("weatherEntity");
    const backgroundMusicEntity = data.get("backgroundMusicEntity");
    const backgroundMusicFile = data.get("backgroundMusicFile");
    const useLocalPhotos = data.get("useLocalPhotos") === "on";
    await prisma.configuration.upsert({
      create: {
        name,
        weatherEntity: weatherEntity ?? null,
        backgroundMusicEntity: backgroundMusicEntity ?? null,
        backgroundMusicFile: backgroundMusicFile ?? null,
        useLocalPhotos
      },
      where: {
        uid: params.uid ?? "new"
      },
      update: {
        name,
        weatherEntity: weatherEntity ?? null,
        backgroundMusicEntity: backgroundMusicEntity ?? null,
        backgroundMusicFile: backgroundMusicFile ?? null,
        useLocalPhotos
      }
    });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-3fbc5deb.js')).default;
const file = '_app/immutable/components/pages/config/__uid__/_page.svelte-0c77473c.js';
const imports = ["_app/immutable/components/pages/config/__uid__/_page.svelte-0c77473c.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/googlePhotosStore-5ebdd7fd.js","_app/immutable/chunks/stores-3fa92a4b.js","_app/immutable/chunks/singletons-99afe59e.js","_app/immutable/chunks/AppShell-cfa6c1e0.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js","_app/immutable/chunks/Button-b0c24815.js","_app/immutable/modules/pages/config/__uid__/_page.ts-1bb24b69.js","_app/immutable/chunks/apistore-9577ccf3.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/stores-3fa92a4b.js","_app/immutable/chunks/singletons-99afe59e.js","_app/immutable/chunks/googlePhotosStore-5ebdd7fd.js","_app/immutable/chunks/_page-29f191b9.js"];
const stylesheets = ["_app/immutable/assets/Button-d59859da.css"];
const fonts = [];

var _4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  component: component,
  file: file,
  fonts: fonts,
  imports: imports,
  index: index,
  server: _page_server_ts,
  stylesheets: stylesheets,
  universal: _page_ts
});

export { _4 as _, tokenStore as t };
//# sourceMappingURL=4-093ea071.js.map

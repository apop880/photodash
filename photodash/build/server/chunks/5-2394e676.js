import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const insert = data.get("insert");
    const hassBaseUrl = data.get("hassBaseUrl");
    const token = data.get("token");
    const googleClientId = data.get("googleClientId");
    const googleClientSecret = data.get("googleClientSecret");
    const googleRefreshToken = data.get("googleRefreshToken");
    if (insert === "true") {
      await prisma.baseSettings.create({
        data: {
          hassBaseUrl,
          token: token.length > 0 ? token : null,
          googleClientId: googleClientId.length > 0 ? googleClientId : null,
          googleClientSecret: googleClientSecret.length > 0 ? googleClientSecret : null,
          googleRefreshToken: googleRefreshToken.length > 0 ? googleRefreshToken : null
        }
      });
      return { success: true };
    }
    await prisma.baseSettings.updateMany({
      where: {
        hassBaseUrl: {
          not: void 0
        }
      },
      data: {
        hassBaseUrl,
        token: token.length > 0 ? token : null,
        googleClientId: googleClientId.length > 0 ? googleClientId : null,
        googleClientSecret: googleClientSecret.length > 0 ? googleClientSecret : null,
        googleRefreshToken: googleRefreshToken.length > 0 ? googleRefreshToken : null
      }
    });
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 5;
const component = async () => (await import('./_page.svelte-2bdd1999.js')).default;
const file = '_app/immutable/components/pages/settings/_page.svelte-613e25c5.js';
const imports = ["_app/immutable/components/pages/settings/_page.svelte-613e25c5.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/singletons-99afe59e.js","_app/immutable/chunks/Stack-756f318e.js","_app/immutable/chunks/stitches.config-5e7a5ac4.js","_app/immutable/chunks/AppShell-cfa6c1e0.js","_app/immutable/chunks/Button-b0c24815.js"];
const stylesheets = ["_app/immutable/assets/Button-d59859da.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, stylesheets };
//# sourceMappingURL=5-2394e676.js.map

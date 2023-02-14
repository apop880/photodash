import { p as prisma } from "../../../chunks/prisma.js";
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
export {
  actions
};

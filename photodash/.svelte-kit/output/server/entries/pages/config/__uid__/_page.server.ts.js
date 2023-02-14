import { p as prisma } from "../../../../chunks/prisma.js";
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
export {
  actions,
  load
};

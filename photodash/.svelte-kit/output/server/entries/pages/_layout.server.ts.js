import { p as prisma } from "../../chunks/prisma.js";
import { r as redirect } from "../../chunks/index.js";
const load = async ({ route }) => {
  const baseSettings = await prisma.baseSettings.findFirst();
  if (!baseSettings && route.id !== "/settings") {
    throw redirect(302, "/settings");
  }
  return { baseSettings };
};
export {
  load
};

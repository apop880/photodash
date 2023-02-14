import { p as prisma } from "../../chunks/prisma.js";
const load = async () => {
  let configurations = await prisma.configuration.findMany({ select: { uid: true, name: true } });
  return { configurations };
};
export {
  load
};

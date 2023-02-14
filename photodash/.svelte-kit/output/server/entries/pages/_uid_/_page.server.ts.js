import { p as prisma } from "../../../chunks/prisma.js";
const load = async ({ params }) => {
  let body = await prisma.configuration.findFirst({ where: { uid: params.uid } });
  return { configuration: body };
};
export {
  load
};

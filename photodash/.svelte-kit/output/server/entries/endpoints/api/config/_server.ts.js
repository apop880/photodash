import { j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
async function GET() {
  let body = await prisma.configuration.findMany();
  return json(body);
}
export {
  GET
};

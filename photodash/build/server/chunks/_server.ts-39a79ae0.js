import { j as json } from './index-3fb25cb5.js';
import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

async function GET() {
  let body = await prisma.configuration.findMany();
  return json(body);
}

export { GET };
//# sourceMappingURL=_server.ts-39a79ae0.js.map

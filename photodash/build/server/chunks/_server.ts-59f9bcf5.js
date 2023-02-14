import { j as json } from './index-3fb25cb5.js';
import fs from 'fs';

const GET = ({ url }) => {
  const folder = url.searchParams.get("name");
  const path = "build/client";
  const files = fs.readdirSync(`${path}/share/photodash/${folder}`).map((file) => `/share/photodash/${folder}/${file}`);
  return json(files);
};

export { GET };
//# sourceMappingURL=_server.ts-59f9bcf5.js.map

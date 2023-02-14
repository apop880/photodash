import "../../../../chunks/apistore.js";
import "../../../../chunks/googlePhotosStore.js";
import "../../../../chunks/index3.js";
const load = async ({ data, fetch, parent }) => {
  return { ...data, entities: [] };
};
export {
  load
};

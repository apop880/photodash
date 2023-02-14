import { r as readable } from "./index2.js";
import "./index3.js";
const tokenStore = readable("", function start(set) {
  return function stop() {
  };
});
export {
  tokenStore as t
};

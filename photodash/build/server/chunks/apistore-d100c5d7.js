import { r as readable } from './index2-2ab0d1d1.js';
import './index3-4c4d02a4.js';
import { getAuth, callService } from 'home-assistant-js-websocket';

let conn;
async function loadTokens() {
  try {
    return JSON.parse(localStorage.hassTokens);
  } catch (err) {
    return void 0;
  }
}
const saveTokens = (tokens) => {
  localStorage.hassTokens = JSON.stringify(tokens);
};
const stateStore = readable(null, function start(set) {
  return function stop() {
  };
});
const action = (serviceType, target) => {
  let [domain, service] = serviceType.split(".");
  callService(conn, domain, service, void 0, {
    entity_id: target
  });
};
const getHassAuth = async (hassBaseUrl) => {
  let auth = await getAuth({ hassUrl: hassBaseUrl, loadTokens, saveTokens });
  if (auth.expired) {
    saveTokens(null);
    auth = await getAuth({ hassUrl: hassBaseUrl, loadTokens, saveTokens });
  }
  return auth;
};

export { action as a, getHassAuth as g, stateStore as s };
//# sourceMappingURL=apistore-d100c5d7.js.map

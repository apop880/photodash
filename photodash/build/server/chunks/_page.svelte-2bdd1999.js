import { c as create_ssr_component, v as validate_component, j as add_attribute } from './index3-4c4d02a4.js';
import { b as browser, S as Stack$1 } from './Stack-120caae6.js';
import { A as AppShell$1 } from './AppShell-8609061e.js';
import { B as Button$1 } from './Button-318087cd.js';
import './prod-ssr-7cc47430.js';
import './stitches.config-84e08abb.js';
import './index2-2ab0d1d1.js';

function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const invalidate = guard("invalidate");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if (form?.success && browser) {
    invalidate("/");
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${validate_component(AppShell$1, "AppShell").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : `
${validate_component(Stack$1, "Stack").$$render($$result, {}, {}, {
        default: () => {
          return `<h1>Global Settings</h1>
<form method="${"POST"}"><input type="${"hidden"}" id="${"insert"}" name="${"insert"}"${add_attribute("value", data.baseSettings === null, 0)}>
    <label for="${"hassBaseUrl"}">For Initial Setup, Please Provide the Base URL, including port, of your Home Assistant instance:</label>
    <input type="${"text"}" id="${"hassBaseUrl"}" name="${"hassBaseUrl"}"${add_attribute("value", data.baseSettings?.hassBaseUrl ?? null, 0)} placeholder="${"e.g. http://192.168.1.1:8123"}" required><br>
    <label for="${"token"}">Optionally provide a long-lived token to use for auth:</label>
    <input type="${"text"}" id="${"token"}" name="${"token"}"${add_attribute("value", data.baseSettings?.token ?? null, 0)}><br>
    <h2>Google Photos</h2>
    <label for="${"googleClientId"}">Google API Client Id:</label>
    <input type="${"text"}" id="${"googleClientId"}" name="${"googleClientId"}"${add_attribute("value", data.baseSettings?.googleClientId ?? null, 0)}><br>
    <label for="${"googleClientSecret"}">Google API Client Secret:</label>
    <input type="${"text"}" id="${"googleClientSecret"}" name="${"googleClientSecret"}"${add_attribute("value", data.baseSettings?.googleClientSecret ?? null, 0)}><br>
    <label for="${"googleRefreshToken"}">Google API Refresh Token:</label>
    <input type="${"text"}" id="${"googleRefreshToken"}" name="${"googleRefreshToken"}"${add_attribute("value", data.baseSettings?.googleRefreshToken ?? null, 0)}><br>
    ${validate_component(Button$1, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Save`;
            }
          })}
    <a href="${"/"}">Home</a></form>`;
        }
      })}
`}`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-2bdd1999.js.map

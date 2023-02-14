import { c as create_ssr_component, d as subscribe, v as validate_component, r as escape, j as add_attribute, t as each } from "../../../../chunks/index3.js";
import { t as tokenStore } from "../../../../chunks/googlePhotosStore.js";
import { A as AppShell } from "../../../../chunks/AppShell.js";
import { B as Button } from "../../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tokenStore, $$unsubscribe_tokenStore;
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => $tokenStore = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      if ($tokenStore !== "") {
        fetch("https://photoslibrary.googleapis.com/v1/albums", {
          headers: { "Authorization": `Bearer ${$tokenStore}` }
        }).then((res) => res.json()).then((json) => console.log(json));
      }
    }
  }
  $$unsubscribe_tokenStore();
  return `${validate_component(AppShell, "AppShell").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : `
    ${"error" in data ? `${escape(data.error)}` : `${data.entities?.length === 0 ? `Loading...` : `<form method="${"POST"}"><label for="${"name"}">Configuration Name</label>
            <input type="${"text"}" id="${"name"}" name="${"name"}"${add_attribute("value", data.configuration?.name, 0)} required>
            <label for="${"weather-entity"}">Weather Entity</label>
            <select name="${"weatherEntity"}" id="${"weather-entity"}"><option value="${""}" ${data.configuration?.weatherEntity === null ? "selected" : ""}>None</option>${each(data.entities, (entity) => {
        return `${entity.startsWith("weather") ? `<option${add_attribute("value", entity, 0)} ${data.configuration?.weatherEntity === entity ? "selected" : ""}>${escape(entity)}</option>` : ``}`;
      })}</select><br>
            <label for="${"music-entity"}">Background Music Entity</label>
            <select name="${"backgroundMusicEntity"}" id="${"music-entity"}"><option value="${""}" ${data.configuration?.backgroundMusicEntity === null ? "selected" : ""}>None</option>${each(data.entities, (entity) => {
        return `${entity.startsWith("input_boolean") ? `<option${add_attribute("value", entity, 0)} ${data.configuration?.backgroundMusicEntity === entity ? "selected" : ""}>${escape(entity)}</option>` : ``}`;
      })}</select><br>
            <label for="${"music-file"}">Background Music File</label>
            <input type="${"text"}" id="${"music-file"}" name="${"backgroundMusicFile"}"${add_attribute("value", data.configuration?.backgroundMusicFile, 0)}><br>
            <input type="${"checkbox"}" id="${"local-photos"}" name="${"useLocalPhotos"}" ${data.configuration?.useLocalPhotos ? "checked" : ""}>
            <label for="${"local-photos"}">(Home Assistant Add-On Only) Use local photos. Photodash will look in /share/photodash/${escape(data.configuration?.name.length > 0 ? data.configuration?.name : "configurationName")} and display the files in that folder as your background slideshow.</label><br>
            ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Save`;
        }
      })}</form>`}`}
`}`;
    }
  })}`;
});
export {
  Page as default
};

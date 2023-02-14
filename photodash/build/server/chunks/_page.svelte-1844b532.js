import { c as create_ssr_component, d as subscribe, v as validate_component, x as onDestroy } from './index3-4c4d02a4.js';
import { s as stateStore, a as action } from './apistore-d100c5d7.js';
import { A as AppShell$1 } from './AppShell-8609061e.js';
import './index2-2ab0d1d1.js';
import 'home-assistant-js-websocket';
import './stitches.config-84e08abb.js';

const Bgmusic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $stateStore, $$unsubscribe_stateStore;
  $$unsubscribe_stateStore = subscribe(stateStore, (value) => $stateStore = value);
  let { entity } = $$props;
  let { url } = $$props;
  let entityObj;
  let audioFile = new Audio(url);
  audioFile.onended = () => action("homeassistant.toggle", entity);
  if ($$props.entity === void 0 && $$bindings.entity && entity !== void 0)
    $$bindings.entity(entity);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  {
    {
      if ($stateStore !== null) {
        entityObj = Object.values($stateStore).filter((value) => value.entity_id === entity)[0];
      }
    }
  }
  {
    {
      if (entityObj.state === "on") {
        audioFile.play();
      } else if (entityObj.state === "off") {
        audioFile.pause();
        audioFile.currentTime = 0;
      }
    }
  }
  $$unsubscribe_stateStore();
  return ``;
});
const css$1 = {
  code: "#backgroundSlider.svelte-17f2d8v{height:100%;width:100%;position:absolute;top:0px;left:0px;color:transparent;z-index:-1}.image.svelte-17f2d8v{height:100%;width:100%;position:absolute;top:0;left:0;background-position:center;background-size:contain;background-repeat:no-repeat}",
  map: null
};
const Slideshow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rotator;
  onDestroy(() => {
    clearInterval(rotator);
  });
  $$result.css.add(css$1);
  return `<div id="${"backgroundSlider"}" class="${"svelte-17f2d8v"}">${`${``}`}</div>`;
});
const css = {
  code: "body{background-color:rgb(51, 51, 51);overflow-y:hidden}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $stateStore, $$unsubscribe_stateStore;
  $$unsubscribe_stateStore = subscribe(stateStore, (value) => $stateStore = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_stateStore();
  return `${validate_component(AppShell$1, "AppShell").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : `
${$stateStore !== null ? `${data.configuration?.backgroundMusicEntity && data.configuration?.backgroundMusicFile ? `${validate_component(Bgmusic, "MusicPlayer").$$render(
        $$result,
        {
          entity: data.configuration.backgroundMusicEntity,
          url: data.configuration.backgroundMusicFile
        },
        {},
        {}
      )}` : ``}
    ${data.configuration?.useLocalPhotos ? `${validate_component(Slideshow, "Slideshow").$$render($$result, {}, {}, {})}` : ``}` : ``}
`}`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1844b532.js.map

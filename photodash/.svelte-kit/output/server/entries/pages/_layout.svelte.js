import { c as create_ssr_component, b as compute_rest_props, d as subscribe, e as beforeUpdate, g as get_current_component, s as setContext, f as spread, h as escape_attribute_value, i as escape_object, j as add_attribute, v as validate_component } from "../../chunks/index3.js";
import { c as colorScheme, u as useSvelteUITheme, a as useSvelteUIThemeContext, b as createEventForwarder, S as SvelteUIGlobalCSS, N as NormalizeCSS, k as key, s as ssrStyles, g as getCssText, d as dark, e as createStyles } from "../../chunks/stitches.config.js";
const SvelteUIProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let overrides;
  let mergedTheme;
  let cx;
  let classes;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "element",
    "theme",
    "styles",
    "defaultProps",
    "themeObserver",
    "withNormalizeCSS",
    "withGlobalStyles",
    "ssr",
    "override",
    "inherit"
  ]);
  let $colorScheme, $$unsubscribe_colorScheme;
  $$unsubscribe_colorScheme = subscribe(colorScheme, (value) => $colorScheme = value);
  let { use = [], class: className = "", element = void 0, theme = useSvelteUITheme(), styles = {}, defaultProps = {}, themeObserver = "light", withNormalizeCSS = false, withGlobalStyles = false, ssr = false, override = {}, inherit = false } = $$props;
  beforeUpdate(() => {
    const htmlClassList = document.documentElement.classList;
    if ($colorScheme === "dark")
      htmlClassList.add(dark.className);
    if ($colorScheme === "light")
      htmlClassList.remove(dark.className);
  });
  const ctx = useSvelteUIThemeContext();
  const useStyles = createStyles((_) => ({ root: {} }));
  createEventForwarder(get_current_component());
  const DEFAULT_THEME = useSvelteUITheme();
  const currentTheme = () => {
    if (themeObserver === null)
      return null;
    return themeObserver === "light" ? mergedTheme : dark;
  };
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.styles === void 0 && $$bindings.styles && styles !== void 0)
    $$bindings.styles(styles);
  if ($$props.defaultProps === void 0 && $$bindings.defaultProps && defaultProps !== void 0)
    $$bindings.defaultProps(defaultProps);
  if ($$props.themeObserver === void 0 && $$bindings.themeObserver && themeObserver !== void 0)
    $$bindings.themeObserver(themeObserver);
  if ($$props.withNormalizeCSS === void 0 && $$bindings.withNormalizeCSS && withNormalizeCSS !== void 0)
    $$bindings.withNormalizeCSS(withNormalizeCSS);
  if ($$props.withGlobalStyles === void 0 && $$bindings.withGlobalStyles && withGlobalStyles !== void 0)
    $$bindings.withGlobalStyles(withGlobalStyles);
  if ($$props.ssr === void 0 && $$bindings.ssr && ssr !== void 0)
    $$bindings.ssr(ssr);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.inherit === void 0 && $$bindings.inherit && inherit !== void 0)
    $$bindings.inherit(inherit);
  {
    if (withGlobalStyles)
      SvelteUIGlobalCSS();
  }
  {
    if (withNormalizeCSS)
      NormalizeCSS();
  }
  overrides = {
    themeOverride: inherit ? { ...ctx.theme, ...theme } : theme,
    styles: inherit ? { ...ctx.styles, ...styles } : styles,
    defaultProps: inherit ? { ...ctx.styles, ...defaultProps } : defaultProps
  };
  {
    setContext(key, {
      theme: overrides.themeOverride,
      styles: {},
      defaultProps: {}
    });
  }
  {
    colorScheme.set(themeObserver);
  }
  mergedTheme = mergeTheme(DEFAULT_THEME, overrides.themeOverride);
  ({ cx, classes } = useStyles(null, { override }));
  $$unsubscribe_colorScheme();
  return `${$$result.head += `<!-- HEAD_svelte-fs7qp0_START -->${ssr ? `<!-- HTML_TAG_START -->${ssrStyles(getCssText)}<!-- HTML_TAG_END -->` : ``}<!-- HEAD_svelte-fs7qp0_END -->`, ""}

<div${spread(
    [
      { id: "SVELTEUI_PROVIDER" },
      {
        class: escape_attribute_value(cx(className, classes.root, currentTheme()))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const SvelteUIProvider$1 = SvelteUIProvider;
function mergeTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    return currentTheme;
  }
  return Object.keys(currentTheme).reduce((acc, key2) => {
    acc[key2] = typeof themeOverride[key2] === "object" ? { ...currentTheme[key2], ...themeOverride[key2] } : typeof themeOverride[key2] === "number" ? themeOverride[key2] : themeOverride[key2] || currentTheme[key2];
    return acc;
  }, {});
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SvelteUIProvider$1, "SvelteUIProvider").$$render(
    $$result,
    {
      withNormalizeCSS: true,
      withGlobalStyles: true
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
export {
  Layout as default
};

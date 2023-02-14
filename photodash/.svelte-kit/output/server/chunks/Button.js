import { c as create_ssr_component, j as add_attribute, b as compute_rest_props, g as get_current_component, v as validate_component, m as missing_component, x as onDestroy, f as spread, h as escape_attribute_value, i as escape_object, w as compute_slots } from "./index3.js";
import { d as dark, h as fns, t as theme, b as createEventForwarder, e as createStyles } from "./stitches.config.js";
import { u as useActions } from "./AppShell.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { observable = false } = $$props;
  let { component } = $$props;
  let { code } = $$props;
  if ($$props.observable === void 0 && $$bindings.observable && observable !== void 0)
    $$bindings.observable(observable);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  return `${observable ? `<!-- HTML_TAG_START -->${exception(component, code)}<!-- HTML_TAG_END -->` : ``}`;
});
const Error$1 = Error;
const isBrowser = () => typeof window !== "undefined";
const browser = isBrowser();
const minifiedCss = ".modal-header{padding: 2px 16px;background-color: #339af0;color: white;}.modal-body{padding: 2px 16px;}.modal-footer{padding: 2px 16px;background-color: #339af0;color: white;}.modal-content{position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);animation-name: animateTop;animation-duration: 0.4s;}@keyframes animateTop {from {top: -300px; opacity: 0}to {top: 0; opacity: 1}}";
const style = browser ? document.createElement("style") : void 0;
if (browser) {
  const s = style;
  s.textContent = minifiedCss;
  s.id = "svelteui-inject";
}
function UserException(component, message, solution) {
  if (browser)
    document.head.appendChild(style);
  const html = `
    <div class="modal-content">
        <div class="modal-header">
            <h2>[${component} Component Error]:</h2>
            <h3>${message}</h3>
        </div>
        <div class="modal-body">
            <pre>
                ${solution ? solution : ""}
            </pre>
        </div>
        <div class="modal-footer">
            <h3>Fix the code to dismiss this error.</h3>
        </div>
    </div>        
    `;
  return html;
}
function exception(component, code) {
  const { message, solution } = code;
  if (solution) {
    return UserException(component, message, solution);
  }
  return UserException(component, message);
}
const vFunc = (color, gradient) => {
  const { themeColor, rgba } = fns;
  const variants = {
    /** Filled variant */
    filled: {
      [`${dark.selector} &`]: {
        backgroundColor: themeColor(color, 8)
      },
      border: "transparent",
      backgroundColor: themeColor(color, 6),
      color: "White",
      "&:hover": { backgroundColor: themeColor(color, 7) }
    },
    /** Light variant */
    light: {
      [`${dark.selector} &`]: {
        backgroundColor: rgba(themeColor(color, 8), 0.35),
        color: color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
        "&:hover": { backgroundColor: rgba(themeColor(color, 7), 0.45) }
      },
      border: "transparent",
      backgroundColor: themeColor(color, 0),
      color: color === "dark" ? themeColor("dark", 9) : themeColor(color, 6),
      "&:hover": { backgroundColor: themeColor(color, 1) }
    },
    /** Outline variant */
    outline: {
      [`${dark.selector} &`]: {
        border: `1px solid ${themeColor(color, 4)}`,
        color: `${themeColor(color, 4)}`,
        "&:hover": { backgroundColor: rgba(themeColor(color, 4), 0.05) }
      },
      border: `1px solid ${themeColor(color, 7)}`,
      backgroundColor: "transparent",
      color: themeColor(color, 7),
      "&:hover": {
        backgroundColor: rgba(themeColor(color, 0), 0.35)
      }
    },
    /** Subtle variant */
    subtle: {
      [`${dark.selector} &`]: {
        color: color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
        "&:hover": { backgroundColor: rgba(themeColor(color, 8), 0.35) }
      },
      border: "transparent",
      backgroundColor: "transparent",
      color: color === "dark" ? themeColor("dark", 9) : themeColor(color, 6),
      "&:hover": {
        backgroundColor: themeColor(color, 0)
      }
    },
    /** Default variant */
    default: {
      [`${dark.selector} &`]: {
        border: `1px solid ${themeColor("dark", 5)}`,
        backgroundColor: themeColor("dark", 5),
        color: "White",
        "&:hover": { backgroundColor: themeColor("dark", 4) }
      },
      border: `1px solid ${themeColor("gray", 4)}`,
      backgroundColor: "White",
      color: "Black",
      "&:hover": { backgroundColor: themeColor("gray", 0) }
    },
    /** White variant */
    white: {
      border: "transparent",
      backgroundColor: "White",
      color: themeColor(color, 7),
      "&:hover": { backgroundColor: "White" }
    },
    gradient: {}
  };
  if (gradient) {
    variants.gradient = {
      border: "transparent",
      background: `linear-gradient(${gradient.deg}deg, $${gradient.from}600 0%, $${gradient.to}600 100%)`,
      color: "White"
    };
  }
  return variants;
};
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 25 } = $$props;
  let { color = "blue" } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<svg${add_attribute("width", `${size}px`, 0)}${add_attribute("height", `${size}px`, 0)} viewBox="${"0 0 38 38"}" xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("stroke", color, 0)}${add_attribute("class", className, 0)}><g fill="${"none"}" fill-rule="${"evenodd"}"><g transform="${"translate(2.5 2.5)"}" stroke-width="${"5"}"><circle stroke-opacity="${".5"}" cx="${"16"}" cy="${"16"}" r="${"16"}"></circle><path d="${"M32 16c0-9.94-8.06-16-16-16"}"><animateTransform attributeName="${"transform"}" type="${"rotate"}" from="${"0 16 16"}" to="${"360 16 16"}" dur="${"1s"}" repeatCount="${"indefinite"}"></animateTransform></path></g></g></svg>`;
});
const Circle$1 = Circle;
const Bars = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 25 } = $$props;
  let { color = "blue" } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<svg viewBox="${"0 0 135 140"}" xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("fill", color, 0)}${add_attribute("width", `${size}px`, 0)}${add_attribute("class", className, 0)}><rect y="${"10"}" width="${"15"}" height="${"120"}" rx="${"6"}"><animate attributeName="${"height"}" begin="${"0.5s"}" dur="${"1s"}" values="${"120;110;100;90;80;70;60;50;40;140;120"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"y"}" begin="${"0.5s"}" dur="${"1s"}" values="${"10;15;20;25;30;35;40;45;50;0;10"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></rect><rect x="${"30"}" y="${"10"}" width="${"15"}" height="${"120"}" rx="${"6"}"><animate attributeName="${"height"}" begin="${"0.25s"}" dur="${"1s"}" values="${"120;110;100;90;80;70;60;50;40;140;120"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"y"}" begin="${"0.25s"}" dur="${"1s"}" values="${"10;15;20;25;30;35;40;45;50;0;10"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></rect><rect x="${"60"}" width="${"15"}" height="${"140"}" rx="${"6"}"><animate attributeName="${"height"}" begin="${"0s"}" dur="${"1s"}" values="${"120;110;100;90;80;70;60;50;40;140;120"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"y"}" begin="${"0s"}" dur="${"1s"}" values="${"10;15;20;25;30;35;40;45;50;0;10"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></rect><rect x="${"90"}" y="${"10"}" width="${"15"}" height="${"120"}" rx="${"6"}"><animate attributeName="${"height"}" begin="${"0.25s"}" dur="${"1s"}" values="${"120;110;100;90;80;70;60;50;40;140;120"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"y"}" begin="${"0.25s"}" dur="${"1s"}" values="${"10;15;20;25;30;35;40;45;50;0;10"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></rect><rect x="${"120"}" y="${"10"}" width="${"15"}" height="${"120"}" rx="${"6"}"><animate attributeName="${"height"}" begin="${"0.5s"}" dur="${"1s"}" values="${"120;110;100;90;80;70;60;50;40;140;120"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"y"}" begin="${"0.5s"}" dur="${"1s"}" values="${"10;15;20;25;30;35;40;45;50;0;10"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></rect></svg>`;
});
const Bars$1 = Bars;
const Dots = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 25 } = $$props;
  let { color = "blue" } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<svg${add_attribute("width", `${size}px`, 0)}${add_attribute("height", `${size / 4}px`, 0)} viewBox="${"0 0 120 30"}" xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("fill", color, 0)}${add_attribute("class", className, 0)}><circle cx="${"15"}" cy="${"15"}" r="${"15"}"><animate attributeName="${"r"}" from="${"15"}" to="${"15"}" begin="${"0s"}" dur="${"0.8s"}" values="${"15;9;15"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"fill-opacity"}" from="${"1"}" to="${"1"}" begin="${"0s"}" dur="${"0.8s"}" values="${"1;.5;1"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></circle><circle cx="${"60"}" cy="${"15"}" r="${"9"}" fill-opacity="${"0.3"}"><animate attributeName="${"r"}" from="${"9"}" to="${"9"}" begin="${"0s"}" dur="${"0.8s"}" values="${"9;15;9"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"fill-opacity"}" from="${"0.5"}" to="${"0.5"}" begin="${"0s"}" dur="${"0.8s"}" values="${".5;1;.5"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></circle><circle cx="${"105"}" cy="${"15"}" r="${"15"}"><animate attributeName="${"r"}" from="${"15"}" to="${"15"}" begin="${"0s"}" dur="${"0.8s"}" values="${"15;9;15"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate><animate attributeName="${"fill-opacity"}" from="${"1"}" to="${"1"}" begin="${"0s"}" dur="${"0.8s"}" values="${"1;.5;1"}" calcMode="${"linear"}" repeatCount="${"indefinite"}"></animate></circle></svg>`;
});
const Dots$1 = Dots;
const LOADER_SIZES = {
  xs: 18,
  sm: 22,
  md: 36,
  lg: 44,
  xl: 58
};
const getCorrectShade = (color, dark2 = false) => {
  return theme.colors[dark2 ? `${color}400` : `${color}600`].value;
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "element", "class", "size", "color", "variant"]);
  let { use = [], element = void 0, class: className = "", size = "md", color = "blue", variant = "circle" } = $$props;
  const forwardEvents = createEventForwarder(get_current_component());
  const LOADERS = { bars: Bars$1, circle: Circle$1, dots: Dots$1 };
  const defaultLoader = variant in LOADERS ? variant : "circle";
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `
${validate_component(LOADERS[defaultLoader] || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        {},
        { use: [forwardEvents, [useActions, use]] },
        {
          color: color === "white" ? "white" : getCorrectShade(color)
        },
        { size: LOADER_SIZES[size] },
        { class: className },
        $$restProps,
        { this: element }
      ),
      {
        this: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Loader$1 = Loader;
const sizes = {
  xs: {
    height: 30,
    padding: "0px 14px"
  },
  sm: {
    height: 36,
    padding: "0px 18px"
  },
  md: {
    height: 42,
    padding: "0px 22px"
  },
  lg: {
    height: 50,
    padding: "0px 26px"
  },
  xl: {
    height: 60,
    padding: "0px 32px"
  },
  "compact-xs": {
    height: 22,
    padding: "0 7px"
  },
  "compact-sm": {
    height: 26,
    padding: "0 8px"
  },
  "compact-md": {
    height: 30,
    padding: "0 10px"
  },
  "compact-lg": {
    height: 34,
    padding: "0 12px"
  },
  "compact-xl": {
    height: 40,
    padding: "0 14px"
  }
};
const useStyles = createStyles((theme2, { color, compact, fullSize, gradient, radius, size, variant }) => {
  return {
    root: {
      focusRing: "auto",
      cursor: "pointer",
      position: "relative",
      boxSizing: "border-box",
      textDecoration: "none",
      outline: "none",
      userSelect: "none",
      appearance: "none",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: null,
      borderRadius: typeof radius === "number" ? radius : `$${radius}`,
      height: typeof size === "number" ? `${size}px` : sizes[compact ? `compact-${size}` : size].height,
      padding: typeof size === "number" ? `0px ${size}px` : sizes[compact ? `compact-${size}` : size].padding,
      fontFamily: "$standard",
      fontWeight: "$SemiBold",
      fontSize: `$${size}`,
      lineHeight: 1,
      flexGrow: 0,
      width: fullSize ? "100%" : "auto",
      "&:hover": {
        backgroundColor: variant === "gradient" ? null : theme2.fn.themeColor(color, 7),
        backgroundSize: variant === "gradient" ? "200%" : null
      },
      "&:active": {
        transform: "translateY(1px)"
      },
      "&.disabled": {
        pointerEvents: "none",
        borderColor: "transparent",
        backgroundColor: "rgb(233, 236, 239)",
        background: "rgb(233, 236, 239)",
        color: "rgb(173, 181, 189)",
        cursor: "not-allowed"
      },
      "&.loading": {
        pointerEvents: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -1,
          backgroundColor: "rgba(255, 255, 255, .5)",
          borderRadius: `$${radius}`,
          cursor: "not-allowed"
        }
      }
    },
    variants: {
      variation: vFunc(color, gradient)
    }
  };
});
const ButtonErrors = Object.freeze([
  {
    error: true,
    message: "If using the disabled prop, a loading cannot be set at the same time",
    solution: `
                If your component looks like this:
                
                &lt;Button disabled loading ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ ^^^^^^^ - Try removing one of these
                `
  },
  {
    error: true,
    message: "If using the external prop, a href prop must be associated with it. If you have an href prop there must be content inside.",
    solution: `
                If your component looks like this:
                
                &lt;Button external ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ - Try adding the href prop too
                `
  }
]);
const Ripple_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".ripple.svelte-3pkhve{display:block;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;border-radius:inherit;color:inherit;pointer-events:none;z-index:0;contain:strict}.ripple.svelte-3pkhve .animation{color:inherit;position:absolute;top:0;left:0;border-radius:50%;opacity:0;pointer-events:none;overflow:hidden;will-change:transform, opacity}.ripple.svelte-3pkhve .animation-enter{transition:none}.ripple.svelte-3pkhve .animation-in{transition:opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);transition:transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),\n			opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)}.ripple.svelte-3pkhve .animation-out{transition:opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)}",
  map: null
};
const Ripple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { center = false } = $$props;
  let { circle = false } = $$props;
  let { color = "currentColor" } = $$props;
  let el;
  onDestroy(() => {
    {
      return;
    }
  });
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  if ($$props.circle === void 0 && $$bindings.circle && circle !== void 0)
    $$bindings.circle(circle);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$1);
  return `<div class="${"ripple svelte-3pkhve"}"${add_attribute("this", el, 0)}></div>`;
});
const Ripple$1 = Ripple;
const Button_svelte_svelte_type_style_lang = "";
const css = {
  code: ".uppercase.svelte-1n9fp7y{text-transform:uppercase}.loader-left.svelte-1n9fp7y{margin-right:10px}.loader-right.svelte-1n9fp7y{margin-left:10px}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getStyles;
  let cx;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "element",
    "class",
    "override",
    "variant",
    "color",
    "size",
    "radius",
    "gradient",
    "loaderPosition",
    "loaderProps",
    "href",
    "external",
    "disabled",
    "compact",
    "loading",
    "uppercase",
    "fullSize",
    "ripple"
  ]);
  let $$slots = compute_slots(slots);
  let { use = [], element = void 0, class: className = "", override = {}, variant = "filled", color = "blue", size = "sm", radius = "sm", gradient = { from: "indigo", to: "cyan", deg: 45 }, loaderPosition = "left", loaderProps = {
    size: "xs",
    color: "white",
    variant: "circle"
  }, href = null, external = false, disabled = false, compact = false, loading = false, uppercase = false, fullSize = false, ripple = false } = $$props;
  createEventForwarder(get_current_component());
  let observable = false;
  let err;
  if (disabled && loading) {
    observable = true;
    err = ButtonErrors[0];
  }
  if (external && typeof href !== "string" || href?.length < 1) {
    observable = true;
    err = ButtonErrors[1];
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.radius === void 0 && $$bindings.radius && radius !== void 0)
    $$bindings.radius(radius);
  if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0)
    $$bindings.gradient(gradient);
  if ($$props.loaderPosition === void 0 && $$bindings.loaderPosition && loaderPosition !== void 0)
    $$bindings.loaderPosition(loaderPosition);
  if ($$props.loaderProps === void 0 && $$bindings.loaderProps && loaderProps !== void 0)
    $$bindings.loaderProps(loaderProps);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.external === void 0 && $$bindings.external && external !== void 0)
    $$bindings.external(external);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0)
    $$bindings.compact(compact);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.uppercase === void 0 && $$bindings.uppercase && uppercase !== void 0)
    $$bindings.uppercase(uppercase);
  if ($$props.fullSize === void 0 && $$bindings.fullSize && fullSize !== void 0)
    $$bindings.fullSize(fullSize);
  if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
    $$bindings.ripple(ripple);
  $$result.css.add(css);
  {
    if (observable)
      override = { display: "none" };
  }
  ({ getStyles, cx } = useStyles({
    color,
    compact,
    fullSize,
    gradient,
    radius,
    size,
    variant
  }));
  return `${validate_component(Error$1, "Error").$$render(
    $$result,
    {
      observable,
      component: "Button",
      code: err
    },
    {},
    {}
  )}



${href && !disabled ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        class: escape_attribute_value(cx(className, getStyles({ css: override, variation: variant }), { disabled, loading }))
      },
      { role: "button" },
      { rel: "noreferrer noopener" },
      {
        target: escape_attribute_value(external ? "_blank" : "_self")
      },
      escape_object($$restProps),
      { tabindex: "0" }
    ],
    {
      classes: (compact ? "compact" : "") + " " + (uppercase ? "uppercase" : "") + " svelte-1n9fp7y"
    }
  )}${add_attribute("this", element, 0)}>${loading && loaderPosition === "left" ? `<span class="${"loader-left svelte-1n9fp7y"}">${validate_component(Loader$1, "Loader").$$render(
    $$result,
    {
      variant: loaderProps.variant,
      size: loaderProps.size,
      color: loaderProps.color
    },
    {},
    {}
  )}</span>` : `${$$slots.leftIcon ? `<span class="${"loader-left svelte-1n9fp7y"}">${slots.leftIcon ? slots.leftIcon({}) : `X`}</span>` : ``}`}
		${slots.default ? slots.default({}) : `Button`}
		${ripple ? `${validate_component(Ripple$1, "Ripple").$$render($$result, { center: false, circle: false }, {}, {})}` : ``}
		${loading && loaderPosition === "right" ? `<span class="${"loader-right svelte-1n9fp7y"}">${validate_component(Loader$1, "Loader").$$render(
    $$result,
    {
      variant: loaderProps.variant,
      size: loaderProps.size,
      color: loaderProps.color
    },
    {},
    {}
  )}</span>` : `${$$slots.rightIcon ? `<span class="${"loader-right svelte-1n9fp7y"}">${slots.rightIcon ? slots.rightIcon({}) : `X`}</span>` : ``}`}</a>` : `<button${spread(
    [
      {
        class: escape_attribute_value(cx(className, getStyles({ css: override, variation: variant }), { disabled, loading }))
      },
      { disabled: disabled || null },
      escape_object($$restProps),
      { tabindex: "0" }
    ],
    {
      classes: (compact ? "compact" : "") + " " + (uppercase ? "uppercase" : "") + " svelte-1n9fp7y"
    }
  )}${add_attribute("this", element, 0)}>${loading && loaderPosition === "left" ? `<span class="${"loader-left svelte-1n9fp7y"}">${validate_component(Loader$1, "Loader").$$render(
    $$result,
    {
      variant: loaderProps.variant,
      size: loaderProps.size,
      color: loaderProps.color
    },
    {},
    {}
  )}</span>` : `${$$slots.leftIcon ? `<span class="${"loader-left svelte-1n9fp7y"}">${slots.leftIcon ? slots.leftIcon({}) : `X`}</span>` : ``}`}
		${slots.default ? slots.default({}) : `Button`}
		${ripple ? `${validate_component(Ripple$1, "Ripple").$$render($$result, { center: false, circle: false }, {}, {})}` : ``}
		${loading && loaderPosition === "right" ? `<span class="${"loader-right svelte-1n9fp7y"}">${validate_component(Loader$1, "Loader").$$render(
    $$result,
    {
      variant: loaderProps.variant,
      size: loaderProps.size,
      color: loaderProps.color
    },
    {},
    {}
  )}</span>` : `${$$slots.rightIcon ? `<span class="${"loader-right svelte-1n9fp7y"}">${slots.rightIcon ? slots.rightIcon({}) : `X`}</span>` : ``}`}</button>`}`;
});
const Button$1 = Button;
export {
  Button$1 as B,
  Error$1 as E
};

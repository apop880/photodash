import { c as create_ssr_component, v as validate_component, t as each, r as escape, b as compute_rest_props, g as get_current_component } from './index3-4c4d02a4.js';
import { b as browser, S as Stack$1 } from './Stack-120caae6.js';
import { g as getHassAuth } from './apistore-d100c5d7.js';
import { A as AppShell$1, B as Box$1, u as useActions } from './AppShell-8609061e.js';
import { B as Button$1, E as Error$1 } from './Button-318087cd.js';
import { b as createEventForwarder, e as createStyles } from './stitches.config-84e08abb.js';
import './prod-ssr-7cc47430.js';
import './index2-2ab0d1d1.js';
import 'home-assistant-js-websocket';

function getTextColor(color, variant, gradient, dark = false) {
  if (color === "dimmed")
    return dark ? "$dark200" : "$gray600";
  if (variant === "gradient" || gradient)
    return `$${color}600`;
  if (variant === "link")
    return dark ? `$blue400` : `$blue700`;
  if (variant === "text")
    return dark ? `$${color}500` : `$${color}700`;
}
const useStyles$1 = createStyles((theme, { align, color, inherit, inline, lineClamp, size, tracking, transform, underline, weight, gradient, variant }) => {
  return {
    root: {
      focusRing: "auto",
      [`${theme.dark} &`]: {
        color: color === "dark" ? "$dark50" : getTextColor(color, variant, gradient, true)
      },
      fontFamily: inherit ? "inherit" : "$standard",
      fontSize: inherit ? "inherit" : typeof size === "string" ? `$${size}` : `${size}px`,
      fontWeight: inherit ? "inherit" : `$${weight}`,
      letterSpacing: theme.letterSpacings[tracking]?.value,
      lineHeight: inherit ? "inherit" : inline ? 1 : typeof size === "string" ? `$${size}` : `${size}px`,
      textTransform: transform,
      textDecoration: underline ? "underline" : "none",
      textAlign: align,
      cursor: variant === "link" ? "pointer" : "inherit",
      color: color === "green" ? "Black" : getTextColor(color, variant, gradient),
      backgroundImage: variant === "gradient" ? `linear-gradient(${gradient?.deg}deg, $${gradient?.from}600 0%, $${gradient?.to}600 100%)` : null,
      WebkitBackgroundClip: variant === "gradient" ? "text" : null,
      WebkitTextFillColor: variant === "gradient" ? "transparent" : null,
      ...lineClamp !== void 0 ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical"
      } : {},
      "&:hover": variant === "link" && underline === true ? {
        textDecoration: "underline"
      } : void 0
    }
  };
});
const TextErrors = Object.freeze([
  {
    error: true,
    message: "If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient",
    solution: `
                If your component looks like this:

                &lt;Text gradient={{from: 'blue', to: 'red', deg: 45}}&gt;Text string &lt;/Text&gt;
                                                                    ^^^ - Try adding prop variant='gradient'
                `
  },
  {
    error: true,
    message: "If using the 'link' variant, an href needs to be set and the root must be an anchor",
    solution: `
                If your component looks like this:

                &lt;Text variant='link'&gt;Text string &lt;/Text&gt;
                                    ^^^ - Try adding props href && root={'a'}'
                `
  }
]);
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cx;
  let getStyles;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "element",
    "class",
    "override",
    "align",
    "color",
    "root",
    "transform",
    "variant",
    "size",
    "weight",
    "gradient",
    "inline",
    "lineClamp",
    "underline",
    "inherit",
    "href",
    "tracking"
  ]);
  let { use = [], element = void 0, class: className = "", override = {}, align = "left", color = "dark", root = void 0, transform = "none", variant = "text", size = "md", weight = "normal", gradient = { from: "indigo", to: "cyan", deg: 45 }, inline = true, lineClamp = void 0, underline = false, inherit = false, href = "", tracking = "normal" } = $$props;
  const forwardEvents = createEventForwarder(get_current_component());
  let observable = false;
  let err;
  if (gradient === { from: "indigo", to: "cyan", deg: 45 } && variant !== "gradient") {
    observable = true;
    err = TextErrors[0];
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.transform === void 0 && $$bindings.transform && transform !== void 0)
    $$bindings.transform(transform);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.weight === void 0 && $$bindings.weight && weight !== void 0)
    $$bindings.weight(weight);
  if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0)
    $$bindings.gradient(gradient);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.lineClamp === void 0 && $$bindings.lineClamp && lineClamp !== void 0)
    $$bindings.lineClamp(lineClamp);
  if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0)
    $$bindings.underline(underline);
  if ($$props.inherit === void 0 && $$bindings.inherit && inherit !== void 0)
    $$bindings.inherit(inherit);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tracking === void 0 && $$bindings.tracking && tracking !== void 0)
    $$bindings.tracking(tracking);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    ({ cx, getStyles } = useStyles$1({
      lineClamp,
      underline,
      inline,
      inherit,
      gradient,
      variant,
      align,
      color,
      transform,
      size,
      weight,
      tracking
    }));
    $$rendered = `${validate_component(Error$1, "Error").$$render($$result, { observable, component: "Text", code: err }, {}, {})}



${validate_component(Box$1, "Box").$$render(
      $$result,
      Object.assign(
        {},
        { root },
        { use: [forwardEvents, [useActions, use]] },
        {
          class: cx(className, getStyles({ css: override }))
        },
        { href: href ?? void 0 },
        $$restProps,
        { element }
      ),
      {
        element: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Text$1 = Text;
const POSITIONS = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  apart: "space-between"
};
const useStyles = createStyles((theme, { align, direction, grow, noWrap, position, spacing, children }) => {
  return {
    root: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: direction,
      alignItems: align || (direction === "row" ? "center" : grow ? "stretch" : position === "apart" ? "flex-start" : POSITIONS[position]),
      flexWrap: noWrap ? "nowrap" : "wrap",
      justifyContent: direction === "row" ? POSITIONS[position] : void 0,
      gap: theme.fn.size({ size: spacing, sizes: theme.space }),
      "& > *": {
        boxSizing: "border-box",
        maxWidth: grow && direction === "row" ? `calc(${100 / children}% - ${theme.fn.size({ size: spacing, sizes: theme.space }) - theme.fn.size({ size: spacing, sizes: theme.space }) / children}px)` : void 0,
        flexGrow: grow ? 1 : 0
      }
    }
  };
});
const Group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cx;
  let getStyles;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "element",
    "class",
    "override",
    "position",
    "noWrap",
    "grow",
    "spacing",
    "direction",
    "align"
  ]);
  let { use = [], element = void 0, class: className = "", override = {}, position = "left", noWrap = false, grow = false, spacing = "md", direction = "row", align = "center" } = $$props;
  let children;
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.noWrap === void 0 && $$bindings.noWrap && noWrap !== void 0)
    $$bindings.noWrap(noWrap);
  if ($$props.grow === void 0 && $$bindings.grow && grow !== void 0)
    $$bindings.grow(grow);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    ({ cx, getStyles } = useStyles({
      align,
      children,
      direction,
      grow,
      noWrap,
      position,
      spacing
    }));
    $$rendered = `

${validate_component(Box$1, "Box").$$render(
      $$result,
      Object.assign(
        {},
        { use },
        {
          class: cx(className, getStyles({ css: override }))
        },
        $$restProps,
        { element }
      ),
      {
        element: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Group$1 = Group;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if (!data.baseSettings?.token && browser) {
    getHassAuth(data.baseSettings.hassBaseUrl);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(AppShell$1, "AppShell").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : `
${validate_component(Stack$1, "Stack").$$render($$result, {}, {}, {
        default: () => {
          return `<h1>Welcome to PhotoDash!</h1>
${validate_component(Button$1, "Button").$$render($$result, { href: "/settings" }, {}, {
            default: () => {
              return `Settings`;
            }
          })}
${data.configurations.length > 0 ? `<h2>Existing Configurations</h2>
        ${each(data.configurations, (config) => {
            return `${validate_component(Group$1, "Group").$$render($$result, { grow: true }, {}, {
              default: () => {
                return `${validate_component(Text$1, "Text").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(config.name)}`;
                  }
                })}
                ${validate_component(Button$1, "Button").$$render($$result, { href: `/${config.uid}` }, {}, {
                  default: () => {
                    return `Load`;
                  }
                })}
                ${validate_component(Button$1, "Button").$$render($$result, { href: `/config/${config.uid}` }, {}, {
                  default: () => {
                    return `Edit`;
                  }
                })}
            `;
              }
            })}`;
          })}` : `<h2>No Existing Configurations</h2>`}
${validate_component(Button$1, "Button").$$render($$result, { href: "/config" }, {}, {
            default: () => {
              return `Create New Configuration`;
            }
          })}`;
        }
      })}
`}`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-9bdafa92.js.map

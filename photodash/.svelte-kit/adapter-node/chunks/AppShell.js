import { c as create_ssr_component, b as compute_rest_props, g as get_current_component, f as spread, r as escape, i as escape_object, j as add_attribute, u as is_void, v as validate_component, m as missing_component, w as compute_slots } from "./index3.js";
import { b as createEventForwarder, a as useSvelteUIThemeContext, u as useSvelteUITheme, f as css, e as createStyles, h as fns } from "./stitches.config.js";
function useActions(node, actions) {
  const actionReturns = [];
  if (actions) {
    for (let i = 0; i < actions.length; i++) {
      const actionEntry = actions[i];
      const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
      if (Array.isArray(actionEntry) && actionEntry.length > 1) {
        actionReturns.push(action(node, actionEntry[1]));
      } else {
        actionReturns.push(action(node));
      }
    }
  }
  return {
    update(actions2) {
      if ((actions2 && actions2.length || 0) != actionReturns.length) {
        throw new Error("You must not change the length of an actions array.");
      }
      if (actions2) {
        for (let i = 0; i < actions2.length; i++) {
          const returnEntry = actionReturns[i];
          if (returnEntry && returnEntry.update) {
            const actionEntry = actions2[i];
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
              returnEntry.update(actionEntry[1]);
            } else {
              returnEntry.update();
            }
          }
        }
      }
    },
    destroy() {
      for (let i = 0; i < actionReturns.length; i++) {
        const returnEntry = actionReturns[i];
        if (returnEntry && returnEntry.destroy) {
          returnEntry.destroy();
        }
      }
    }
  };
}
const SYSTEM_PROPS = {
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight"
};
const NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function isValidSizeValue(margin) {
  return typeof margin === "string" || typeof margin === "number";
}
function getSizeValue(margin, theme2) {
  if (NEGATIVE_VALUES.includes(margin)) {
    return theme2.fn.size({ size: margin.replace("-", ""), sizes: theme2.space }) * -1;
  }
  return theme2.fn.size({ size: margin, sizes: theme2.space });
}
function getSystemStyles(systemStyles, theme2) {
  const styles = {};
  if (isValidSizeValue(systemStyles.p)) {
    const value = getSizeValue(systemStyles.p, theme2);
    styles.padding = value;
  }
  if (isValidSizeValue(systemStyles.m)) {
    const value = getSizeValue(systemStyles.m, theme2);
    styles.margin = value;
  }
  if (isValidSizeValue(systemStyles.py)) {
    const value = getSizeValue(systemStyles.py, theme2);
    styles.paddingTop = value;
    styles.paddingBottom = value;
  }
  if (isValidSizeValue(systemStyles.px)) {
    const value = getSizeValue(systemStyles.px, theme2);
    styles.paddingLeft = value;
    styles.paddingRight = value;
  }
  if (isValidSizeValue(systemStyles.my)) {
    const value = getSizeValue(systemStyles.my, theme2);
    styles.marginTop = value;
    styles.marginBottom = value;
  }
  if (isValidSizeValue(systemStyles.mx)) {
    const value = getSizeValue(systemStyles.mx, theme2);
    styles.marginLeft = value;
    styles.marginRight = value;
  }
  Object.keys(SYSTEM_PROPS).forEach((property) => {
    if (isValidSizeValue(systemStyles[property])) {
      styles[SYSTEM_PROPS[property]] = theme2.fn.size({
        size: getSizeValue(systemStyles[property], theme2),
        sizes: theme2.space
      });
    }
  });
  return styles;
}
const Box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let BoxStyles;
  let systemStyles;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "element",
    "class",
    "css",
    "root",
    "m",
    "my",
    "mx",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "py",
    "px",
    "pt",
    "pb",
    "pl",
    "pr"
  ]);
  let { use = [], element = void 0, class: className = "", css: css$1 = {}, root = void 0, m = void 0, my = void 0, mx = void 0, mt = void 0, mb = void 0, ml = void 0, mr = void 0, p = void 0, py = void 0, px = void 0, pt = void 0, pb = void 0, pl = void 0, pr = void 0 } = $$props;
  const forwardEvents = createEventForwarder(get_current_component());
  const castRoot = () => root;
  const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
  const getCSSStyles = typeof css$1 === "function" ? css$1 : () => css$1;
  let isHTMLElement;
  let isComponent;
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.css === void 0 && $$bindings.css && css$1 !== void 0)
    $$bindings.css(css$1);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.m === void 0 && $$bindings.m && m !== void 0)
    $$bindings.m(m);
  if ($$props.my === void 0 && $$bindings.my && my !== void 0)
    $$bindings.my(my);
  if ($$props.mx === void 0 && $$bindings.mx && mx !== void 0)
    $$bindings.mx(mx);
  if ($$props.mt === void 0 && $$bindings.mt && mt !== void 0)
    $$bindings.mt(mt);
  if ($$props.mb === void 0 && $$bindings.mb && mb !== void 0)
    $$bindings.mb(mb);
  if ($$props.ml === void 0 && $$bindings.ml && ml !== void 0)
    $$bindings.ml(ml);
  if ($$props.mr === void 0 && $$bindings.mr && mr !== void 0)
    $$bindings.mr(mr);
  if ($$props.p === void 0 && $$bindings.p && p !== void 0)
    $$bindings.p(p);
  if ($$props.py === void 0 && $$bindings.py && py !== void 0)
    $$bindings.py(py);
  if ($$props.px === void 0 && $$bindings.px && px !== void 0)
    $$bindings.px(px);
  if ($$props.pt === void 0 && $$bindings.pt && pt !== void 0)
    $$bindings.pt(pt);
  if ($$props.pb === void 0 && $$bindings.pb && pb !== void 0)
    $$bindings.pb(pb);
  if ($$props.pl === void 0 && $$bindings.pl && pl !== void 0)
    $$bindings.pl(pl);
  if ($$props.pr === void 0 && $$bindings.pr && pr !== void 0)
    $$bindings.pr(pr);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        isHTMLElement = root && typeof root === "string";
        isComponent = root && typeof root === "function";
      }
    }
    BoxStyles = css({});
    systemStyles = getSystemStyles(
      {
        m,
        my,
        mx,
        mt,
        mb,
        ml,
        mr,
        p,
        py,
        px,
        pt,
        pb,
        pl,
        pr
      },
      theme2
    );
    $$rendered = `

${isHTMLElement ? `
	${((tag) => {
      return tag ? `<${castRoot()}${spread(
        [
          {
            class: escape(className, true) + " " + escape(
              BoxStyles({
                css: { ...getCSSStyles(theme2), ...systemStyles }
              }),
              true
            )
          },
          escape_object($$restProps)
        ],
        {}
      )}${add_attribute("this", element, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
    })(castRoot())}` : `${isComponent ? `${validate_component(root || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        {},
        { use: [forwardEvents, [useActions, use]] },
        {
          class: className + " " + BoxStyles({
            css: { ...getCSSStyles(theme2), ...systemStyles }
          })
        },
        $$restProps,
        { this: element }
      ),
      {
        this: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}` : `<div${spread(
      [
        {
          class: escape(className, true) + " " + escape(
            BoxStyles({
              css: { ...getCSSStyles(theme2), ...systemStyles }
            }),
            true
          )
        },
        escape_object($$restProps)
      ],
      {}
    )}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</div>`}`}`;
  } while (!$$settled);
  return $$rendered;
});
const Box$1 = Box;
const theme = {
  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  }
};
function getPositionStyles(props, theme2) {
  const padding = fns.size({ size: props.padding, sizes: theme2.spacing });
  const navbarOffset = props.navbarOffsetBreakpoint ? fns.size({ size: props.navbarOffsetBreakpoint, sizes: theme2.breakpoints }) : null;
  const asideOffset = props.asideOffsetBreakpoint ? fns.size({ size: props.asideOffsetBreakpoint, sizes: theme2.breakpoints }) : null;
  if (!props.fixed) {
    return { padding };
  }
  return {
    minHeight: "100vh",
    paddingTop: `calc(var(--svelteui-header-height, 0px) + ${padding}px)`,
    paddingBottom: `calc(var(--svelteui-footer-height, 0px) + ${padding}px)`,
    paddingLeft: `calc(var(--svelteui-navbar-width, 0px) + ${padding}px)`,
    paddingRight: `calc(var(--svelteui-aside-width, 0px) + ${padding}px)`,
    [`@media (max-width: ${navbarOffset}px)`]: {
      paddingLeft: padding
    },
    [`@media (max-width: ${asideOffset}px)`]: {
      paddingRight: padding
    }
  };
}
const useStyles = createStyles((_, props) => {
  return {
    root: {
      boxSizing: "border-box"
    },
    body: {
      display: "flex",
      boxSizing: "border-box"
    },
    main: {
      flex: 1,
      width: "100vw",
      boxSizing: "border-box",
      ...getPositionStyles(props, theme)
    }
  };
});
const AppShellProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "element", "class", "override", "value"]);
  let { use = [], element = void 0, class: className = "", override = {}, value } = $$props;
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Box$1, "Box").$$render(
      $$result,
      Object.assign({}, { class: className }, { css: { ...override } }, { use }, $$restProps, { element }),
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
const AppShellProvider$1 = AppShellProvider;
const AppShell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cx;
  let classes;
  let $$slots = compute_slots(slots);
  let { use = [], element = void 0, class: className = "", override = {}, zIndex = 100, fixed = false, padding = "md", navbarOffsetBreakpoint = void 0, asideOffsetBreakpoint = void 0 } = $$props;
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.navbarOffsetBreakpoint === void 0 && $$bindings.navbarOffsetBreakpoint && navbarOffsetBreakpoint !== void 0)
    $$bindings.navbarOffsetBreakpoint(navbarOffsetBreakpoint);
  if ($$props.asideOffsetBreakpoint === void 0 && $$bindings.asideOffsetBreakpoint && asideOffsetBreakpoint !== void 0)
    $$bindings.asideOffsetBreakpoint(asideOffsetBreakpoint);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    ({ cx, classes } = useStyles(
      {
        padding,
        fixed,
        navbarOffsetBreakpoint,
        asideOffsetBreakpoint
      },
      { override, name: "AppShell" }
    ));
    $$rendered = `${validate_component(AppShellProvider$1, "AppShellProvider").$$render(
      $$result,
      {
        use,
        value: { fixed, zIndex },
        class: cx(className, classes.root),
        element
      },
      {
        element: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Box$1, "Box").$$render($$result, {}, {}, {
            default: () => {
              return `${$$slots.header ? `${slots.header ? slots.header({}) : ``}` : ``}
		<div${add_attribute("class", classes.body, 0)}>${$$slots.navbar ? `${slots.navbar ? slots.navbar({}) : ``}` : ``}
			<main${add_attribute("class", classes.main, 0)}>${slots.default ? slots.default({}) : ``}</main>
			${$$slots.aside ? `${slots.aside ? slots.aside({}) : ``}` : ``}</div>
		${$$slots.footer ? `${slots.footer ? slots.footer({}) : ``}` : ``}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const AppShell$1 = AppShell;
export {
  AppShell$1 as A,
  Box$1 as B,
  useActions as u
};

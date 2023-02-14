import { B as BROWSER } from "./prod-ssr.js";
import { c as create_ssr_component, b as compute_rest_props, v as validate_component } from "./index3.js";
import { e as createStyles } from "./stitches.config.js";
import { B as Box } from "./AppShell.js";
const browser = BROWSER;
const useStyles = createStyles((theme, { align, justify, spacing }) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: `${align}`,
      justifyContent: `${justify}`,
      gap: theme.fn.size({ size: spacing, sizes: theme.space })
    }
  };
});
const Stack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cx;
  let getStyles;
  let $$restProps = compute_rest_props($$props, ["use", "element", "class", "override", "spacing", "align", "justify"]);
  let { use = [], element = void 0, class: className = "", override = {}, spacing = "md", align = "stretch", justify = "center" } = $$props;
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.override === void 0 && $$bindings.override && override !== void 0)
    $$bindings.override(override);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    ({ cx, getStyles } = useStyles({ align, justify, spacing }));
    $$rendered = `

${validate_component(Box, "Box").$$render(
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
const Stack$1 = Stack;
export {
  Stack$1 as S,
  browser as b
};

import { l as listen, k as bubble, p as prevent_default, o as stop_propagation, q as getContext } from "./index3.js";
import { createStitches, defaultThemeMap } from "@stitches/core";
import { w as writable } from "./index2.js";
const MODIFIER_DIVIDER = "!";
const modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
function createEventForwarder(component, except = []) {
  let $on;
  const events = [];
  component.$on = (fullEventType, callback) => {
    const eventType = fullEventType;
    let destructor = () => {
    };
    for (const exception of except) {
      if (typeof exception === "string" && exception === eventType) {
        const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      if (typeof exception === "object" && exception["name"] === eventType) {
        const oldCallback = callback;
        callback = (...props) => {
          if (!(typeof exception === "object" && exception["shouldExclude"]())) {
            oldCallback(...props);
          }
        };
      }
    }
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const modifierMatch = eventType.match(modifierRegex);
      if (modifierMatch) {
        const parts = eventType.split(MODIFIER_DIVIDER);
        eventType = parts[0];
        const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events.length; i++) {
      $on(events[i][0], events[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (const entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
const key = {};
const ssrStyles = (fn) => {
  return `<style	id="stitches">${fn()}</style>`;
};
function useSvelteUIThemeContext() {
  return getContext(key);
}
const colorScheme = writable("light");
function useSvelteUITheme() {
  let observer;
  colorScheme?.subscribe((mode) => {
    observer = mode;
  });
  const DEFAULT_THEME = {
    // @ts-ignore
    ...theme,
    colorNames: colorNameMap,
    colorScheme: observer,
    dark: dark?.selector,
    fn: {
      themeColor: fns.themeColor,
      size: fns.size,
      radius: fns.radius,
      rgba: fns.rgba,
      variant: fns.variant
    }
  };
  return DEFAULT_THEME;
}
function themeColor(color, shade = 0) {
  const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
  let _shade = "50";
  if (!isSvelteUIColor(color))
    return color;
  if (shade !== Number(0))
    _shade = `${shade.toString()}00`;
  return theme2.colors[`${color}${_shade}`]?.value;
}
function isSvelteUIColor(color) {
  let valid = false;
  switch (color) {
    case "dark":
      valid = true;
      break;
    case "gray":
      valid = true;
      break;
    case "red":
      valid = true;
      break;
    case "pink":
      valid = true;
      break;
    case "grape":
      valid = true;
      break;
    case "violet":
      valid = true;
      break;
    case "indigo":
      valid = true;
      break;
    case "blue":
      valid = true;
      break;
    case "cyan":
      valid = true;
      break;
    case "teal":
      valid = true;
      break;
    case "green":
      valid = true;
      break;
    case "lime":
      valid = true;
      break;
    case "yellow":
      valid = true;
      break;
    case "orange":
      valid = true;
      break;
    default:
      valid = false;
      break;
  }
  return valid;
}
function size(props) {
  if (typeof props.size === "number") {
    return props.size;
  }
  if (typeof props.sizes[props.size] === "number") {
    return props.sizes[props.size];
  }
  return +props.sizes[props.size]?.value || +props.sizes.md?.value;
}
function radius(radii) {
  const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
  if (typeof radii === "number") {
    return radii;
  }
  return theme2.radii[radii].value;
}
function isHexColor(hex) {
  const replaced = hex.replace("#", "");
  return typeof replaced === "string" && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`));
}
function hexToRgba(color) {
  const replaced = color.replace("#", "");
  const parsed = parseInt(replaced, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r, g, b, a: a || 1 };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function rgba(color, alpha = 1) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  const { r, g, b } = toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const DEFAULT_GRADIENT = {
  from: "indigo",
  to: "cyan",
  deg: 45
};
function variant({ variant: variant2, color, gradient }) {
  const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
  const primaryShade = 6;
  if (variant2 === "light") {
    return {
      border: "transparent",
      background: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)],
      color: [
        color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
        color === "dark" ? themeColor("dark", 9) : themeColor(color, primaryShade)
      ],
      // themeColor(color, theme.colorScheme === 'dark' ? 2 : getPrimaryShade('light')),
      hover: [rgba(themeColor(color, 7), 0.45), rgba(themeColor(color, 1), 0.65)]
    };
  }
  if (variant2 === "default") {
    return {
      border: [themeColor("dark", 5), themeColor("gray", 4)],
      background: [themeColor("dark", 5), theme2.colors.white.value],
      color: [theme2.colors.white.value, theme2.colors.black.value],
      hover: [themeColor("dark", 4), themeColor("gray", 0)]
    };
  }
  if (variant2 === "white") {
    return {
      border: "transparent",
      background: theme2.colors.white.value,
      color: themeColor(color, primaryShade),
      hover: null
    };
  }
  if (variant2 === "outline") {
    return {
      border: [themeColor(color, 4), themeColor(color, primaryShade)],
      background: "transparent",
      color: [themeColor(color, 4), themeColor(color, primaryShade)],
      hover: [rgba(themeColor(color, 4), 0.05), rgba(themeColor(color, 0), 0.35)]
    };
  }
  if (variant2 === "gradient") {
    const merged = {
      from: gradient?.from || DEFAULT_GRADIENT.from,
      to: gradient?.to || DEFAULT_GRADIENT.to,
      deg: gradient?.deg || DEFAULT_GRADIENT.deg
    };
    return {
      background: `linear-gradient(${merged.deg}deg, ${themeColor(merged.from, primaryShade)} 0%, ${themeColor(merged.to, primaryShade)} 100%)`,
      color: theme2.colors.white.value,
      border: "transparent",
      hover: null
    };
  }
  if (variant2 === "subtle") {
    return {
      border: "transparent",
      background: "transparent",
      color: [
        color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
        color === "dark" ? themeColor("dark", 9) : themeColor(color, primaryShade)
      ],
      hover: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)]
    };
  }
  return {
    border: "transparent",
    background: [themeColor(color, 8), themeColor(color, primaryShade)],
    color: theme2.colors.white.value,
    hover: themeColor(color, 7)
  };
}
const fns = {
  size,
  radius,
  themeColor,
  variant,
  rgba
};
const colors = {
  primary: "#228be6",
  white: "#ffffff",
  black: "#000000",
  dark50: "#C1C2C5",
  dark100: "#A6A7AB",
  dark200: "#909296",
  dark300: "#5c5f66",
  dark400: "#373A40",
  dark500: "#2C2E33",
  dark600: "#25262b",
  dark700: "#1A1B1E",
  dark800: "#141517",
  dark900: "#101113",
  gray50: "#f8f9fa",
  gray100: "#f1f3f5",
  gray200: "#e9ecef",
  gray300: "#dee2e6",
  gray400: "#ced4da",
  gray500: "#adb5bd",
  gray600: "#868e96",
  gray700: "#495057",
  gray800: "#343a40",
  gray900: "#212529",
  red50: "#fff5f5",
  red100: "#ffe3e3",
  red200: "#ffc9c9",
  red300: "#ffa8a8",
  red400: "#ff8787",
  red500: "#ff6b6b",
  red600: "#fa5252",
  red700: "#f03e3e",
  red800: "#e03131",
  red900: "#c92a2a",
  pink50: "#fff0f6",
  pink100: "#ffdeeb",
  pink200: "#fcc2d7",
  pink300: "#faa2c1",
  pink400: "#f783ac",
  pink500: "#f06595",
  pink600: "#e64980",
  pink700: "#d6336c",
  pink800: "#c2255c",
  pink900: "#a61e4d",
  grape50: "#f8f0fc",
  grape100: "#f3d9fa",
  grape200: "#eebefa",
  grape300: "#e599f7",
  grape400: "#da77f2",
  grape500: "#cc5de8",
  grape600: "#be4bdb",
  grape700: "#ae3ec9",
  grape800: "#9c36b5",
  grape900: "#862e9c",
  violet50: "#f3f0ff",
  violet100: "#e5dbff",
  violet200: "#d0bfff",
  violet300: "#b197fc",
  violet400: "#9775fa",
  violet500: "#845ef7",
  violet600: "#7950f2",
  violet700: "#7048e8",
  violet800: "#6741d9",
  violet900: "#5f3dc4",
  indigo50: "#edf2ff",
  indigo100: "#dbe4ff",
  indigo200: "#bac8ff",
  indigo300: "#91a7ff",
  indigo400: "#748ffc",
  indigo500: "#5c7cfa",
  indigo600: "#4c6ef5",
  indigo700: "#4263eb",
  indigo800: "#3b5bdb",
  indigo900: "#364fc7",
  blue50: "#e7f5ff",
  blue100: "#d0ebff",
  blue200: "#a5d8ff",
  blue300: "#74c0fc",
  blue400: "#4dabf7",
  blue500: "#339af0",
  blue600: "#228be6",
  blue700: "#1c7ed6",
  blue800: "#1971c2",
  blue900: "#1864ab",
  cyan50: "#e3fafc",
  cyan100: "#c5f6fa",
  cyan200: "#99e9f2",
  cyan300: "#66d9e8",
  cyan400: "#3bc9db",
  cyan500: "#22b8cf",
  cyan600: "#15aabf",
  cyan700: "#1098ad",
  cyan800: "#0c8599",
  cyan900: "#0b7285",
  teal50: "#e6fcf5",
  teal100: "#c3fae8",
  teal200: "#96f2d7",
  teal300: "#63e6be",
  teal400: "#38d9a9",
  teal500: "#20c997",
  teal600: "#12b886",
  teal700: "#0ca678",
  teal800: "#099268",
  teal900: "#087f5b",
  green50: "#ebfbee",
  green100: "#d3f9d8",
  green200: "#b2f2bb",
  green300: "#8ce99a",
  green400: "#69db7c",
  green500: "#51cf66",
  green600: "#40c057",
  green700: "#37b24d",
  green800: "#2f9e44",
  green900: "#2b8a3e",
  lime50: "#f4fce3",
  lime100: "#e9fac8",
  lime200: "#d8f5a2",
  lime300: "#c0eb75",
  lime400: "#a9e34b",
  lime500: "#94d82d",
  lime600: "#82c91e",
  lime700: "#74b816",
  lime800: "#66a80f",
  lime900: "#5c940d",
  yellow50: "#fff9db",
  yellow100: "#fff3bf",
  yellow200: "#ffec99",
  yellow300: "#ffe066",
  yellow400: "#ffd43b",
  yellow500: "#fcc419",
  yellow600: "#fab005",
  yellow700: "#f59f00",
  yellow800: "#f08c00",
  yellow900: "#e67700",
  orange50: "#fff4e6",
  orange100: "#ffe8cc",
  orange200: "#ffd8a8",
  orange300: "#ffc078",
  orange400: "#ffa94d",
  orange500: "#ff922b",
  orange600: "#fd7e14",
  orange700: "#f76707",
  orange800: "#e8590c",
  orange900: "#d9480f"
};
const colorNameMap = {
  blue: "blue",
  cyan: "cyan",
  dark: "dark",
  grape: "grape",
  gray: "gray",
  green: "green",
  indigo: "indigo",
  lime: "lime",
  orange: "orange",
  pink: "pink",
  red: "red",
  teal: "teal",
  violet: "violet",
  yellow: "yellow"
};
const hasOwn = {}.hasOwnProperty;
function cx(...args) {
  const classes = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg)
      continue;
    const argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = { ...arg };
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString === Object.prototype.toString) {
        for (const key2 in arg) {
          if (hasOwn.call(arg, key2) && arg[key2]) {
            classes.push(key2);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }
  return classes.join(" ");
}
function cssFactory() {
  return { cx };
}
function fromEntries(entries) {
  const o = {};
  Object.keys(entries).forEach((key2) => {
    const [k, v] = entries[key2];
    o[k] = v;
  });
  return o;
}
function createRef(refName) {
  return `__svelteui-ref-${refName || ""}`;
}
function createSanitizedObject(object, theme2, ref) {
  Object.keys(object).map((value) => {
    if (value === "variants")
      return;
    if ("ref" in object[value])
      object[value].ref;
    if ("darkMode" in object[value]) {
      object[value][`${theme2.dark} &`] = object[value].darkMode;
    }
    object[`& .${value}`] = object[value];
    delete object[value];
  });
  delete object["& .root"];
}
function createStyles(input) {
  const getCssObject = typeof input === "function" ? input : () => input;
  function useStyles(params = {}, options) {
    const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    const { cx: cx2 } = cssFactory();
    const { override } = options || {};
    let ref;
    const cssObjectDirty = getCssObject(theme2, params, createRef);
    const sanitizeObject = Object.assign({}, cssObjectDirty);
    createSanitizedObject(sanitizeObject, theme2);
    const { root } = cssObjectDirty;
    const cssObjectClean = root !== void 0 ? { ...root, ...sanitizeObject } : cssObjectDirty;
    const getStyles = css(cssObjectClean);
    const classes = fromEntries(Object.keys(cssObjectDirty).map((keys) => {
      const getRefName = [];
      ref?.split("-")[getRefName?.length - 1] === keys;
      let value = keys.toString();
      if (keys === "root") {
        value = getStyles({ css: override }).toString();
      }
      return [keys, value];
    }));
    return {
      cx: cx2,
      theme: theme2,
      classes,
      getStyles: css(cssObjectClean)
    };
  }
  return useStyles;
}
const { css, globalCss, keyframes, getCssText, theme, createTheme, config, reset } = createStitches({
  prefix: "svelteui",
  theme: {
    colors,
    space: {
      0: "0rem",
      xs: 10,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
      xsPX: "10px",
      smPX: "12px",
      mdPX: "16px",
      lgPX: "20px",
      xlPX: "24px",
      1: "0.125rem",
      2: "0.25rem",
      3: "0.375rem",
      4: "0.5rem",
      5: "0.625rem",
      6: "0.75rem",
      7: "0.875rem",
      8: "1rem",
      9: "1.25rem",
      10: "1.5rem",
      11: "1.75rem",
      12: "2rem",
      13: "2.25rem",
      14: "2.5rem",
      15: "2.75rem",
      16: "3rem",
      17: "3.5rem",
      18: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem"
    },
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px"
    },
    fonts: {
      standard: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      fallback: "Segoe UI, system-ui, sans-serif"
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      xs: 1,
      sm: 1.25,
      md: 1.5,
      lg: 1.625,
      xl: 1.75
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    sizes: {},
    radii: {
      xs: "2px",
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "32px",
      squared: "33%",
      rounded: "50%",
      pill: "9999px"
    },
    shadows: {
      xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
      sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
      md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
      xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px"
    },
    zIndices: {
      1: "100",
      2: "200",
      3: "300",
      4: "400",
      5: "500",
      10: "1000",
      max: "9999"
    },
    borderWidths: {
      light: "1px",
      normal: "2px",
      bold: "3px",
      extrabold: "4px",
      black: "5px",
      xs: "1px",
      sm: "2px",
      md: "3px",
      lg: "4px",
      xl: "5px"
    },
    breakpoints: {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400
    },
    borderStyles: {},
    transitions: {}
  },
  media: {
    xs: "(min-width: 576px)",
    sm: "(min-width: 768px)",
    md: "(min-width: 992px)",
    lg: "(min-width: 1200px)",
    xl: "(min-width: 1400px)"
  },
  utils: {
    focusRing: (value) => ({
      WebkitTapHighlightColor: "transparent",
      "&:focus": {
        outlineOffset: 2,
        outline: value === "always" || value === "auto" ? "2px solid $primary" : "none"
      },
      "&:focus:not(:focus-visible)": {
        outline: value === "auto" || value === "never" ? "none" : void 0
      }
    }),
    /** padding top */
    p: (value) => ({
      padding: value
    }),
    pt: (value) => ({
      paddingTop: value
    }),
    pr: (value) => ({
      paddingRight: value
    }),
    pb: (value) => ({
      paddingBottom: value
    }),
    pl: (value) => ({
      paddingLeft: value
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    /** margin */
    m: (value) => ({
      margin: value
    }),
    /** margin-top */
    mt: (value) => ({
      marginTop: value
    }),
    mr: (value) => ({
      marginRight: value
    }),
    mb: (value) => ({
      marginBottom: value
    }),
    ml: (value) => ({
      marginLeft: value
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value
    }),
    ta: (value) => ({
      textAlign: value
    }),
    tt: (value) => ({
      textTransform: value
    }),
    to: (value) => ({
      textOverflow: value
    }),
    d: (value) => ({ display: value }),
    dflex: (value) => ({
      display: "flex",
      alignItems: value,
      justifyContent: value
    }),
    fd: (value) => ({
      flexDirection: value
    }),
    fw: (value) => ({ flexWrap: value }),
    ai: (value) => ({
      alignItems: value
    }),
    ac: (value) => ({
      alignContent: value
    }),
    jc: (value) => ({
      justifyContent: value
    }),
    as: (value) => ({
      alignSelf: value
    }),
    fg: (value) => ({ flexGrow: value }),
    fs: (value) => ({
      fontSize: value
    }),
    fb: (value) => ({
      flexBasis: value
    }),
    bc: (value) => ({
      backgroundColor: value
    }),
    bf: (value) => ({
      backdropFilter: value
    }),
    bg: (value) => ({
      background: value
    }),
    bgBlur: (value) => ({
      bf: "saturate(180%) blur(10px)",
      bg: value
    }),
    bgColor: (value) => ({
      backgroundColor: value
    }),
    backgroundClip: (value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    }),
    bgClip: (value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    }),
    br: (value) => ({
      borderRadius: value
    }),
    bw: (value) => ({
      borderWidth: value
    }),
    btrr: (value) => ({
      borderTopRightRadius: value
    }),
    bbrr: (value) => ({
      borderBottomRightRadius: value
    }),
    bblr: (value) => ({
      borderBottomLeftRadius: value
    }),
    btlr: (value) => ({
      borderTopLeftRadius: value
    }),
    bs: (value) => ({
      boxShadow: value
    }),
    normalShadow: (value) => ({
      boxShadow: `0 4px 14px 0 $${value}`
    }),
    lh: (value) => ({
      lineHeight: value
    }),
    ov: (value) => ({ overflow: value }),
    ox: (value) => ({
      overflowX: value
    }),
    oy: (value) => ({
      overflowY: value
    }),
    pe: (value) => ({
      pointerEvents: value
    }),
    events: (value) => ({
      pointerEvents: value
    }),
    us: (value) => ({
      WebkitUserSelect: value,
      userSelect: value
    }),
    userSelect: (value) => ({
      WebkitUserSelect: value,
      userSelect: value
    }),
    w: (value) => ({ width: value }),
    h: (value) => ({
      height: value
    }),
    minW: (value) => ({
      minWidth: value
    }),
    minH: (value) => ({
      minWidth: value
    }),
    mw: (value) => ({
      maxWidth: value
    }),
    maxW: (value) => ({
      maxWidth: value
    }),
    mh: (value) => ({
      maxHeight: value
    }),
    maxH: (value) => ({
      maxHeight: value
    }),
    size: (value) => ({
      width: value,
      height: value
    }),
    minSize: (value) => ({
      minWidth: value,
      minHeight: value,
      width: value,
      height: value
    }),
    sizeMin: (value) => ({
      minWidth: value,
      minHeight: value,
      width: value,
      height: value
    }),
    maxSize: (value) => ({
      maxWidth: value,
      maxHeight: value
    }),
    sizeMax: (value) => ({
      maxWidth: value,
      maxHeight: value
    }),
    appearance: (value) => ({
      WebkitAppearance: value,
      appearance: value
    }),
    scale: (value) => ({
      transform: `scale(${value})`
    }),
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`
    }),
    tdl: (value) => ({
      textDecorationLine: value
    }),
    // Text gradient effect
    textGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    })
  },
  themeMap: {
    ...defaultThemeMap,
    width: "space",
    height: "space",
    minWidth: "space",
    maxWidth: "space",
    minHeight: "space",
    maxHeight: "space",
    flexBasis: "space",
    gridTemplateColumns: "space",
    gridTemplateRows: "space",
    blockSize: "space",
    minBlockSize: "space",
    maxBlockSize: "space",
    inlineSize: "space",
    minInlineSize: "space",
    maxInlineSize: "space",
    borderWidth: "borderWeights"
  }
});
const dark = createTheme("dark-theme", {
  colors,
  shadows: {
    xs: "-4px 0 15px rgb(0 0 0 / 50%)",
    sm: "0 5px 20px -5px rgba(20, 20, 20, 0.1)",
    md: "0 8px 30px rgba(20, 20, 20, 0.15)",
    lg: "0 30px 60px rgba(20, 20, 20, 0.15)",
    xl: "0 40px 80px rgba(20, 20, 20, 0.25)"
  }
});
const SvelteUIGlobalCSS = globalCss({
  a: {
    focusRing: "auto"
  },
  body: {
    [`${dark.selector} &`]: {
      backgroundColor: "$dark700",
      color: "$dark50"
    },
    backgroundColor: "$white",
    color: "$black"
  }
});
const NormalizeCSS = globalCss({
  html: {
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    textSizeAdjust: "100%",
    margin: 0
  },
  body: {
    margin: 0
  },
  "article, aside, footer, header, nav, section, figcaption, figure, main": {
    display: "block"
  },
  h1: {
    fontSize: "2em",
    margin: 0
  },
  hr: {
    boxSizing: "content-box",
    height: 0,
    overflow: "visible"
  },
  pre: {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  a: {
    background: "transparent",
    textDecorationSkip: "objects"
  },
  "a:active, a:hover": {
    outlineWidth: 0
  },
  "abbr[title]": {
    borderBottom: "none",
    textDecoration: "underline"
  },
  "b, strong": {
    fontWeight: "bolder"
  },
  "code, kbp, samp": {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  dfn: {
    fontStyle: "italic"
  },
  mark: {
    backgroundColor: "#ff0",
    color: "#000"
  },
  small: {
    fontSize: "80%"
  },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sup: {
    top: "-0.5em"
  },
  sub: {
    bottom: "-0.25em"
  },
  "audio, video": {
    display: "inline-block"
  },
  "audio:not([controls])": {
    display: "none",
    height: 0
  },
  img: {
    borderStyle: "none",
    verticalAlign: "middle"
  },
  "svg:not(:root)": {
    overflow: "hidden"
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
    margin: 0
  },
  "button, input": {
    overflow: "visible"
  },
  "button, select": {
    textTransform: "none"
  },
  "button, [type=reset], [type=submit]": {
    WebkitAppearance: "button"
  },
  "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner": {
    borderStyle: "none",
    padding: 0
  },
  "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring": {
    outline: "1px dotted ButtonText"
  },
  legend: {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: 0,
    whiteSpace: "normal"
  },
  progress: {
    display: "inline-block",
    verticalAlign: "baseline"
  },
  textarea: {
    overflow: "auto"
  },
  "[type=checkbox], [type=radio]": {
    boxSizing: "border-box",
    padding: 0
  },
  "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button": {
    height: "auto"
  },
  "[type=search]": {
    appearance: "textfield",
    outlineOffset: "-2px"
  },
  "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration": {
    appearance: "none"
  },
  "::-webkit-file-upload-button": {
    appearance: "button",
    font: "inherit"
  },
  "details, menu": {
    display: "block"
  },
  summary: {
    display: "list-item"
  },
  canvas: {
    display: "inline-block"
  },
  template: {
    display: "none"
  },
  "[hidden]": {
    display: "none"
  }
});
export {
  NormalizeCSS as N,
  SvelteUIGlobalCSS as S,
  useSvelteUIThemeContext as a,
  createEventForwarder as b,
  colorScheme as c,
  dark as d,
  createStyles as e,
  css as f,
  getCssText as g,
  fns as h,
  key as k,
  ssrStyles as s,
  theme as t,
  useSvelteUITheme as u
};

import tinycolor from "tinycolor2";

// Color Palette

const p = tinycolor({ h: 230, s: 70, v: 95 }).toRgb(); // p = primary
const dt = tinycolor({ h: 230, s: 60, v: 20 }).toRgb(); // dt = darkest
const d = tinycolor({ h: 230, s: 30, v: 45 }).toRgb(); // d = dark
const m = tinycolor({ h: 230, s: 20, v: 66 }).toRgb(); // m = medium
const l = tinycolor({ h: 230, s: 10, v: 95 }).toRgb(); // l = light
const lt = tinycolor({ h: 230, s: 2, v: 98 }).toRgb(); // lt = lightest
const w = tinycolor({ h: 0, s: 0, v: 100 }).toRgb(); // w = white
const error = tinycolor({ h: 5, s: 60, v: 90 }).toRgb();
const warning = tinycolor({ h: 50, s: 90, v: 85 }).toRgb();
const success = tinycolor({ h: 140, s: 60, v: 90 }).toRgb();

export const PRIMARYCOLOR = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;

// import elements and icons (low-priority tasks)
export const DARKESTVARIATION = `rgba(${dt.r}, ${dt.g}, ${dt.b}, ${dt.a})`;
//text, borders, UI elements for contrast and balance
export const DARKVARIATION = `rgba(${d.r}, ${d.g}, ${d.b}, ${d.a})`;
export const MEDIUMVARIATION = `rgba(${m.r}, ${m.g}, ${m.b}, ${m.a})`;
export const LIGHTVARIATION = `rgba(${l.r}, ${l.g}, ${l.b}, ${l.a})`;
export const LIGHTESTVARIATION = `rgba(${lt.r}, ${lt.g}, ${lt.b}, ${lt.a})`;
export const WHITE = `rgba(${w.r}, ${w.g}, ${w.b}, ${w.a})`;

// PRIORITY COLORS
export const ERROR = `rgba(${error.r}, ${error.g}, ${error.b}, ${error.a})`;
export const WARNING = `rgba(${warning.r}, ${warning.g}, ${warning.b}, ${warning.a})`;
export const SUCCESS = `rgba(${success.r}, ${success.g}, ${success.b}, ${success.a})`;

// SPACING & BORDER SIZE
export const XS = "8pt";
export const SM = "16pt";
export const MD = "24pt";
export const LG = "32pt";
export const XL = "48pt";
export const XXL = "80pt";

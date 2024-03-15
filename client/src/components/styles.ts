import tinycolor from "tinycolor2";

// color for buttons and accents

//headers, buttons, backgrounds

const p = tinycolor({ h: 230, s: 70, v: 95 }).toRgb(); // p = primary
const dt = tinycolor({ h: 230, s: 60, v: 20 }).toRgb(); // dt = darkest
const d = tinycolor({ h: 230, s: 30, v: 45 }).toRgb(); // d = dark
const m = tinycolor({ h: 230, s: 20, v: 66 }).toRgb(); // m = medium
const l = tinycolor({ h: 230, s: 10, v: 95 }).toRgb(); // l = light
const lt = tinycolor({ h: 230, s: 2, v: 98 }).toRgb(); // lt = lightest
const w = tinycolor({ h: 0, s: 0, v: 100 }).toRgb(); // w = white

export const PRIMARYCOLOR = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
console.log("primary", PRIMARYCOLOR);
// import elements and icons (low-priority tasks)
export const DARKESTVARIATION = `rgba(${dt.r}, ${dt.g}, ${dt.b}, ${dt.a})`;
//text, borders, UI elements for contrast and balance
export const DARKVARIATION = `rgba(${d.r}, ${d.g}, ${d.b}, ${d.a})`;
//high priority tasks
export const MEDIUMVARIATION = `rgba(${m.r}, ${m.g}, ${m.b}, ${m.a})`;
export const LIGHTVARIATION = `rgba(${l.r}, ${l.g}, ${l.b}, ${l.a})`;
export const LIGHESTVARIATION = `rgba(${lt.r}, ${lt.g}, ${lt.b}, ${lt.a})`;
export const WHITE = `rgba(${w.r}, ${w.g}, ${w.b}, ${w.a})`;

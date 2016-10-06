declare const module: any;
declare const process: any;
export const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
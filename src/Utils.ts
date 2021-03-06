declare const module: any;
declare const process: any;
import { dig } from "extract-vars";
export const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";

export let getWatchableText = (str) => {
    let re = /({{\s*[^}]+\s*}})/g;
    let list = str.split(re).map((x) => {
        let expr = x.match(/{{\s*([^}]+)\s*}}/);
        if (expr) {
            let expressionString = expr[1].trim();
            return {
                expression: expressionString,
                watchable: dig(expressionString)
            };
        }
        return x;
    });
    let filtered = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== undefined) {
            filtered.push(list[i]);
        }
    }
    return filtered;
}
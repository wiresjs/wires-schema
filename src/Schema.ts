import { AttributeInterceptor, ElementInterceptor } from "./Interceptors";
import { isBackend } from "./Utils";
import { Dom } from "universal-dom";
import { HTMLParser } from "wires-html-parser";


/**
 *
 *
 * @export
 * @class Schema
 */
export class Schema {
    /**
     *
     *
     * @protected
     * @type {Set<ElementInterceptor>}
     * @memberOf Schema
     */
    protected elementInterceptors: Set<ElementInterceptor> = new Set();

    /**
     *
     *
     * @protected
     * @type {Set<AttributeInterceptor>}
     * @memberOf Schema
     */
    protected attributeInterceptors: Map<string, AttributeInterceptor> = new Map();

    /**
     * Creates an instance of Schema.
     *
     * @param {string} dir
     *
     * @memberOf Schema
     */

    private whenReadyClosure: { (schema: Schema): void; };


    /**
     *
     *
     * @param {AttributeInterceptor} interceptor
     *
     * @memberOf Schema
     */
    public addAttributeInterceptor(name: string, interceptor: AttributeInterceptor) {
        this.attributeInterceptors.set(name, interceptor);
    }

    /**
     *
     *
     * @param {ElementInterceptor} interceptor
     *
     * @memberOf Schema
     */
    public addElementInterceptor(interceptor: ElementInterceptor) {
        this.elementInterceptors.add(interceptor);
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf Schema
     */
    public compileFromDirectory(dir: string) {
        if (!isBackend) {
            return;
        }
        return new Promise((resolve, reject) => {
            const walk = require("walk");
            const fs = require("fs");
            const appRoot = require("app-root-path");
            const path = require("path");
            let jsonSchema = [];

            dir = dir[0] !== "/" ? path.join(appRoot.path, dir) : dir;
            let walker = walk.walk(dir);

            walker.on("file", (root, fileStats, next) => {
                let contents = fs.readFileSync(path.join(dir, fileStats.name)).toString();
                let data = HTMLParser.parse(contents, true);
                this.walkJSON(data);
                console.log(data);
                next();
            });

            walker.on("errors", (root, nodeStatsArray, next) => {
                next();
            });

            walker.on("end", () => {
                if (this.whenReadyClosure !== undefined) {
                    this.whenReadyClosure(this);
                }
                return resolve(jsonSchema);
            });
        });
    }

    public whenReady(fn: { (schema: Schema): void; }) {
        this.whenReadyClosure = fn;
    }

    protected walkJSON(json: any[]) {

        json.forEach(item => {
            if (item.children) {
                item.children = this.walkJSON(item.children);
            }
        });
        return json;
    }
}

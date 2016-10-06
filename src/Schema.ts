import { SchemaAdapter } from "./SchemaAdapter";
import { AttributeInterceptor, ElementInterceptor } from "./Interceptors";
import { isBackend } from "./Utils";
import { Dom } from "universal-dom";
import { HTMLParser } from "wires-html-parser";

declare const window: any;
/**
 *
 *
 * @export
 * @class Schema
 */
export class Schema {
    public json: any = {};

    protected adapter: SchemaAdapter;
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
     * @param {SchemaAdapter} adapter
     *
     * @memberOf Schema
     */
    public setAdapter(adapter: SchemaAdapter) {
        this.adapter = adapter;
    }

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
     * @param {{}} data
     * @returns {*}
     *
     * @memberOf Schema
     */
    public digest(ready: { (json: any): void; }): any {

        if (isBackend) {
            if (!this.adapter) {
                throw new Error("Schema Adapter is required!");
            }
            this.adapter.getContent().then(schemaMap => {
                schemaMap.forEach((html, key) => {
                    let json = HTMLParser.parse(html, true);;

                    this.json[key] = this.prepare(json);
                });
                return ready(this.json);
            });
        } else {
            if (window.__universal_schema__ === undefined) {
                throw new Error("Schema not found!\nYou need to set schema to window.__universal_schema__!");
            }
            this.json = window.__universal_schema__;
        }
        return ready(this.json);
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf Schema
     */
    public expressSchema() {
        return (req, res, next) => {
            let content = `window.__universal_schema__ = ${JSON.stringify(this.json)}`;
            res.header("content-type", "text/javascript");
            res.send(content);
        };
    }
    protected prepare(json: any[]) {

        json.forEach(item => {
            if (item.children) {
                item.children = this.prepare(item.children);
            }
        });
        return json;
    }
}

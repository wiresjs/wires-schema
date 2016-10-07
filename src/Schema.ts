import { Context } from "./Context";
import { SchemaAdapter } from "./SchemaAdapter";
import { AttributeInterceptor, ElementInterceptor, TextNodeInterceptor } from "./Interceptors";
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



    /**
     *
     *
     * @protected
     * @type {Set<ElementInterceptor>}
     * @memberOf Schema
     */
    public elementInterceptors: Set<ElementInterceptor> = new Set();


    /**
     *
     *
     * @protected
     * @type {Set<AttributeInterceptor>}
     * @memberOf Schema
     */
    public attributeInterceptors: Map<string, AttributeInterceptor> = new Map();


    public textNodeInterceptor: TextNodeInterceptor;

    protected rootContext: Context;

    protected adapter: SchemaAdapter;

    private whenReadyClosure: { (schema: Schema): void; };

    private onRequestClosure: { (schema: Schema): void; };


    public whenReady(fn: { (schema: Schema): void; }) {
        this.whenReadyClosure = fn;
    }
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
        interceptor.setSchema(this);
        this.attributeInterceptors.set(name, interceptor);
    }

    public registerTextNodeInterceptor(interceptor: TextNodeInterceptor) {
        interceptor.setSchema(this);
        this.textNodeInterceptor = interceptor;
    }

    /**
     *
     *
     * @param {ElementInterceptor} interceptor
     *
     * @memberOf Schema
     */
    public addElementInterceptor(interceptor: ElementInterceptor) {
        interceptor.setSchema(this);
        this.elementInterceptors.add(interceptor);
    }


    public setRootContext(context: Context) {
        this.rootContext = context;
    }

    public getRootContext(): Context {
        return this.rootContext;
    }

    public onRequest(cb: { (schema: Schema): void; }) {
        this.onRequestClosure = cb;
    }

    public trigger(cb: { (inflation: any): void; }) {

        if (this.onRequestClosure) {
            this.rootContext.resolve(() => {
                let inflation = this.onRequestClosure(this.json);
                if (cb !== undefined) {
                    return cb(inflation);
                }
            });
        }
    }
    /**
     *
     *
     * @param {{}} data
     * @returns {*}
     *
     * @memberOf Schema
     */
    public digest(): Schema {
        if (isBackend) {
            if (!this.adapter) {
                throw new Error("Schema Adapter is required!");
            }
            this.adapter.getContent().then(schemaMap => {
                schemaMap.forEach((html, key) => {
                    let json = HTMLParser.parse(html, true);
                    this.json[key] = this.prepare(json);
                });
                this.whenReadyClosure(this);
            });
        } else {
            if (window.__universal_schema__ === undefined) {
                throw new Error("Schema not found!\nYou need to set schema to window.__universal_schema__!");
            }
            this.json = window.__universal_schema__;
            if (this.whenReadyClosure) {
                this.whenReadyClosure(this);
            }
        }
        return this;
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
            if (item.type === "text" && this.textNodeInterceptor) {
                this.textNodeInterceptor.intercept(item);
            }
            if (item.children) {
                item.children = this.prepare(item.children);
            }
        });
        return json;
    }
}

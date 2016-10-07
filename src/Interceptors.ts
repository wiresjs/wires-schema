import { Context } from "./Context";
import { Schema } from "./Schema";
import { JSONSchema } from "./JSONSchema";
import { IUniversalComment, IUniversalElement, IUniversalAttribute, IUniversalTextNode } from "universal-dom";



/**
 *
 *
 * @export
 * @class AttributeInterceptor
 */
export class AttributeInterceptor {
    protected schema: Schema;
    public setSchema(schema: Schema) {
        this.schema = schema;
    }
    /**
     *
     *
     * @param {JSONSchema} attr
     * @param {JSONSchema} element
     * @returns {*}
     *
     * @memberOf AttributeInterceptor
     */
    public intercept(attr: JSONSchema, json: any): any {
        return;
    }

    /**
     *
     *
     * @param {(IUniversalComment<any> | IUniversalElement<any>)} element
     * @param {JSONSchema} schema
     * @returns
     *
     * @memberOf ElementInterceptor
     */
    public consume(attribute: IUniversalAttribute<any>, schema: JSONSchema) {
        return;
    }
}

/**
 *
 *
 * @export
 * @class ElementInterceptor
 */
export class ElementInterceptor {
    protected schema: Schema;
    public setSchema(schema: Schema) {
        this.schema = schema;
    }
    /**
     *
     *
     * @param {JSONSchema} element
     * @returns {*}
     *
     * @memberOf ElementInterceptor
     */
    public intercept(json: any): any {
        return;
    }

    /**
     *
     *
     * @param {(IUniversalComment<any> | IUniversalElement<any>)} element
     * @param {JSONSchema} schema
     * @returns
     *
     * @memberOf ElementInterceptor
     */
    public consume(element: IUniversalComment<any> | IUniversalElement<any>, schema: JSONSchema) {
        return;
    }
}

export class TextNodeInterceptor {
    protected schema: Schema;
    public setSchema(schema: Schema) {
        this.schema = schema;
    }
    /**
     *
     *
     * @param {JSONSchema} element
     * @returns {*}
     *
     * @memberOf ElementInterceptor
     */
    public intercept(json: any): any {
        return;
    }

    /**
     *
     *
     * @param {(IUniversalComment<any> | IUniversalElement<any>)} element
     * @param {JSONSchema} schema
     * @returns
     *
     * @memberOf ElementInterceptor
     */
    public consume(element: IUniversalTextNode<any>, context : Context, schema: any) {

        return;
    }
}

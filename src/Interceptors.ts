import { IUniversalComment, IUniversalElement, IUniversalAttribute, IUniversalTextNode } from "universal-dom";
/**
 *
 *
 * @export
 * @class JSONSchema
 */
export class JSONSchema {
    /**
     * Creates an instance of JSONSchema.
     *
     * @param {*} json
     *
     * @memberOf JSONSchema
     */
    constructor(private json: any) {

    }
    /**
     *
     *
     * @param {string} name
     * @returns
     *
     * @memberOf JSONSchema
     */
    public get(name: string) {
        return this.json[name];
    }
    /**
     *
     *
     * @param {string} name
     * @param {*} value
     *
     * @memberOf JSONSchema
     */
    public set(name: string, value: any) {
        this.json[name] = value;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf JSONSchema
     */
    public getJSON() {
        return this.json;
    }
}


/**
 *
 *
 * @export
 * @class AttributeInterceptor
 */
export class AttributeInterceptor {
    /**
     *
     *
     * @param {JSONSchema} attr
     * @param {JSONSchema} element
     * @returns {*}
     *
     * @memberOf AttributeInterceptor
     */
    public intercept(attr: JSONSchema, element: JSONSchema): any {
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
    public consume(attribute: IUniversalAttribute<any> | IUniversalElement<any>, schema: JSONSchema) {
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
    /**
     *
     *
     * @param {JSONSchema} element
     * @returns {*}
     *
     * @memberOf ElementInterceptor
     */
    public intercept(element: JSONSchema): any {
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

import { JSONSchema } from "./JSONSchema";
import { IUniversalComment, IUniversalElement, IUniversalAttribute, IUniversalTextNode } from "universal-dom";



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

import { IUniversalTextNode } from "universal-dom";
import { JSONSchema } from "./../../JSONSchema";
import { TextNodeInterceptor } from "../../Interceptors";

export class SchemaTextInterceptor extends TextNodeInterceptor {
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
    public consume(attribute: IUniversalTextNode<any>, schema: JSONSchema) {
        return;
    }
}

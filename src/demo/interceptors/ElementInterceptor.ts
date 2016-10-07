import { JSONSchema } from "./../../JSONSchema";
import { ElementInterceptor } from "../../Interceptors";
import { IUniversalComment, IUniversalElement, IUniversalTextNode } from "universal-dom";

export class SchemaRepeaterInterceptor extends ElementInterceptor {
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
    public consume(element: IUniversalComment<any> | IUniversalElement<any> | IUniversalComment<any>, schema: JSONSchema) {


        return;
    }
}

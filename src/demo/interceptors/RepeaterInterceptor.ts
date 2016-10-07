import { IUniversalAttribute } from "universal-dom";
import { JSONSchema } from "./../../JSONSchema";
import { AttributeInterceptor } from "../../Interceptors";

export class SchemaRepeaterInterceptor extends AttributeInterceptor {
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

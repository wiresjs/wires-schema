import { Context } from "./../../Context";
import { getWatchableText } from "./../../Utils";
import { IUniversalTextNode } from "universal-dom";

import { TextNodeInterceptor } from "../../Interceptors";


export class SchemaTextInterceptor extends TextNodeInterceptor {
    public intercept(json: any): any {

        // we re-configure schema here.
        // Hello {{user.name} is converted into
        // [ 'Hello ',   { expression: 'user.name', watchable: [ 'user.name' ] }
        json.value = getWatchableText(json.value);
        console.log(json.value);
    }


    public consume(text: IUniversalTextNode<any>, context: Context, json: any) {
        // here we get
        // [ 'Hello ',   { expression: 'user.name', watchable: [ 'user.name' ] }
        // one thing left is to evaluate and watch ....
        text.setValue(json.value);
        return;
    }
}

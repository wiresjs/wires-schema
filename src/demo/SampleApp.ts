import { Inflation } from "./../Inflation";
import { SchemaFileAdapter } from "./FileAdapter";
import { Context } from "./../Context";
import { SchemaRepeaterInterceptor } from "./interceptors/RepeaterInterceptor";
import { SchemaAttributeInterceptor } from "./interceptors/AttributeInterceptor";
import { SchemaTextInterceptor } from "./interceptors/TextInterceptor";
import { Schema } from "./../Schema";
import { Dom } from "universal-dom";


class MyFrameWorkApplication {
    public name: string;
    constructor() {
        this.name = "Bob";
    }
}

export let SampleApp = (): Schema => {
    let schema = new Schema();
    // Set schema adapater
    schema.setAdapter(new SchemaFileAdapter("views/"));

    // Regular text nodes
    schema.registerTextNodeInterceptor(new SchemaTextInterceptor());

    // register generic attribute interceptor
    // this one will handle basic watchers e.g. class="{{user.active ? 'active' : 'false'}}"
    // On top of that the interceptor could handle user attributes
    // (framework decids how to get them)
    schema.addAttributeInterceptor("*",
        new SchemaAttributeInterceptor());

    // Custom (system) attribute ws-repeat
    // Schema needs to behaive differently on repeates
    schema.addAttributeInterceptor("ws-repeat",
        new SchemaRepeaterInterceptor());

    let context = new Context(new MyFrameWorkApplication());
    schema.setRootContext(context);
    schema.digest();
    schema.onRequest((json) => {
        let inflation = new Inflation(schema, context);
        inflation.setRootSelector(".application");
        return inflation.start(json["foo.html"]);
    });
    return schema;
};

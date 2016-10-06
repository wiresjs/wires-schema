import { SchemaFileAdapter } from "./SchemaFileAdapter";
import { Context } from "./../Context";
import { SchemaRepeaterInterceptor } from "./SchemaRepeaterInterceptor";
import { SchemaAttributeInterceptor } from "./SchemaAttributeInterceptor";
import { Schema } from "./../Schema";


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


    schema.digest((json) => {
        let context = new Context(new MyFrameWorkApplication());
    });
    return schema;
};

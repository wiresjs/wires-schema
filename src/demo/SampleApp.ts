import { SchemaRepeaterInterceptor } from './SchemaRepeaterInterceptor';
import { SchemaAttributeInterceptor } from './SchemaAttributeInterceptor';
import { Schema } from "./../Schema";

export let SampleApp = () => {
    let schema = new Schema();
    schema.compileFromDirectory("views/");

    // register generic attribute interceptor
    // this one will handle basic watchers e.g. class="{{user.active ? 'active' : 'false'}}"
    // On top of that the interceptor could handle user attributes
    // (framework decids how to get them)
    schema.addAttributeInterceptor("*",
        new SchemaAttributeInterceptor());

    // Custom (system) attribute ws-repeat
    // Schema needs to behaive differently on repeates
    schema.addAttributeInterceptor("ws-repeat",
        new SchemaRepeaterInterceptor())
    schema.whenReady(schema => {
        console.log(1);
    });
}

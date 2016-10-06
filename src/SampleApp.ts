import { Schema } from "./Schema";



export let SampleApp = () => {
    let schema = new Schema("views/");
    schema.compile();
}

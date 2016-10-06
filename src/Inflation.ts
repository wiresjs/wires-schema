import { Context } from "./Context";
import { JSONSchema } from "./JSONSchema";
import { Schema } from "./Schema";
import { Dom } from "universal-dom";

/**
 *
 *
 * @export
 * @class Inflation
 */
export class Inflation {
    /**
     * Creates an instance of Inflation.
     *
     * @param {Schema} schema
     * @param {Context} context
     *
     * @memberOf Inflation
     */
    constructor(private schema: Schema, private context: Context) { }

    /**
     *
     *
     * @param {JSONSchema} jsonShema
     * @returns
     *
     * @memberOf Inflation
     */
    public start(jsonShema: JSONSchema) {
        return;
    }
}

/**
 *
 *
 * @export
 * @class JSONSchema
 */
export class JSONSchema {
    /**
     * Creates an instance of JSONSchema.
     *
     * @param {*} json
     *
     * @memberOf JSONSchema
     */
    constructor(private json: any) {

    }
    /**
     *
     *
     * @param {string} name
     * @returns
     *
     * @memberOf JSONSchema
     */
    public get(name: string) {
        return this.json[name];
    }
    /**
     *
     *
     * @param {string} name
     * @param {*} value
     *
     * @memberOf JSONSchema
     */
    public set(name: string, value: any) {
        this.json[name] = value;
    }

    public each(cb: { (obj: any, index: number) }) {
        for (let i = 0; i < this.json.length; i++) {
            let result = cb(this.json[i], i);
            if (result === false) {
                return;
            }
        }
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf JSONSchema
     */
    public getJSON() {
        return this.json;
    }
}
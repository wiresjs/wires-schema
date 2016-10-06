/**
 *
 *
 * @export
 * @class SchemaAdapter
 */
export class SchemaAdapter {
    /**
     *
     *
     * @returns {Promise<Map<string, string>>}
     *
     * @memberOf SchemaAdapter
     */
    public getContent(): Promise<Map<string, string>> {
        return new Promise((resolve, reject) => {
            return resolve(new Map());
        });
    }
}
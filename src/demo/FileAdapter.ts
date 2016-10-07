import { SchemaAdapter } from "./../SchemaAdapter";
/**
 *
 *
 * @export
 * @class SchemaFileAdapter
 * @extends {SchemaAdapter}
 */
export class SchemaFileAdapter extends SchemaAdapter {
    private dir: string;
    constructor(dir: string) {
        super();
        this.dir = dir;
    }
    /**
     *
     *
     * @returns {Promise<Map<string, string>>}
     *
     * @memberOf SchemaFileAdapter
     */
    public getContent(): Promise<Map<string, string>> {
        return new Promise((resolve, reject) => {
            const walk = require("walk");
            const fs = require("fs");
            const appRoot = require("app-root-path");
            const path = require("path");
            let jsonMap: Map<string, string> = new Map();
            let dir = this.dir;
            dir = dir[0] !== "/" ? path.join(appRoot.path, dir) : dir;
            let walker = walk.walk(dir);
            walker.on("file", (root, fileStats, next) => {
                let filePath = path.join(root, fileStats.name);
                let schemaName = filePath.split(dir)[1];

                let contents = fs.readFileSync(filePath).toString();

                jsonMap.set(schemaName, contents);
                next();
            });
            walker.on("errors", (root, nodeStatsArray, next) => {
                next();
            });
            walker.on("end", () => {

                return resolve(jsonMap);
            });
        });
    }
}

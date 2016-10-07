export class Context {
    constructor(public scope?: any, public locals?: any) {

    }

    public resolve(fn: { (cnt: Context): any }) {
        return fn(this);
    }
}

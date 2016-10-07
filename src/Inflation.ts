import { Context } from "./Context";
import { JSONSchema } from "./JSONSchema";
import { Schema } from "./Schema";
import { Dom } from "universal-dom";
import { IUniversalComment, IUniversalElement, IUniversalTextNode } from "universal-dom";
import { isBackend } from "./Utils";
/**
 *
 *
 * @export
 * @class Inflation
 */
export class Inflation {
    private rootElement: IUniversalElement<any>;

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
     * @param {string} selection
     * @param {string} [tag]
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Inflation
     */
    public setRootSelector(selection: string, tag?: string): IUniversalElement<any> {
        if (isBackend) {
            tag = tag || "div";
            this.rootElement = Dom.createElement(tag);
            return this.rootElement;
        } else {
            this.rootElement = Dom.createElement(<HTMLElement>document.querySelector(selection));
            return this.rootElement;
        }
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Inflation
     */
    public getRootSelector(): IUniversalElement<any> {
        return this.rootElement;
    }

    /**
     *
     *
     * @param {JSONSchema} jsonShema
     * @returns
     *
     * @memberOf Inflation
     */
    public start(json: any, element?: IUniversalElement<any>): Inflation {
        let children = new JSONSchema(json);
        // let type = element.getType();
        let parent = element ? element : this.getRootSelector();
        let parentChildren;
        if (parent.getType() === "element") {
            let el = <IUniversalElement<any>>parent;
            parentChildren = el.getChildren();
        }
        children.each((item, index) => {
            if (item.type === "tag") {
                let el = <IUniversalElement<any>>(parentChildren[index] ? parentChildren[index] : Dom.createElement(item.name));
                if (!el.isRehydrated()) {
                     console.log("SSR node render", el);
                    el.appendTo(parent);
                } else {
                    console.log("RE-hydrated tag", el);
                }
                if (item.children) {
                    this.start(item.children, el);
                }
            }
            if (item.type === "text") {
                let el = <IUniversalTextNode<any>>(parentChildren[index] ? parentChildren[index] : Dom.createTextNode(item.value));
                if (!el.isRehydrated()) {
                    console.log("SSR text render", el);
                    el.appendTo(parent);
                } else {
                    console.log("RE-hydrate text", el);
                }
            }
        });

        return this;
    }
}

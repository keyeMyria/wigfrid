import {Injectable} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {FlexGridExtension} from "./Extension/flex-grid-extension";

/**
 *
 */
@Injectable()
export class FlexGridExtensionsService {

    private registedMap: Map<string, FlexGridExtension> = new Map();

    constructor() {

    }

    public grid: FlexGridComponent;


    public getExtensionByName(name) {
        return this.registedMap.get(name);
    }

    public register(name, component) {
        this.registedMap.set(name, component);
    }

    public unRegister(name) {
        this.registedMap.delete(name);
    }

    public enableExtension(name) {
        let extension = this.registedMap.get(name);
        extension.enable();
    }

    public disableExtension(name) {
        let extension = this.registedMap.get(name);
        extension.disable();
    }
}

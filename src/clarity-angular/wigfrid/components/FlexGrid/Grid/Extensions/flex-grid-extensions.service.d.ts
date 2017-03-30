import { FlexGridComponent } from "../FlexGridComponent";
import { FlexGridExtension } from "./Extension/flex-grid-extension";
/**
 *
 */
export declare class FlexGridExtensionsService {
    private registedMap;
    constructor();
    grid: FlexGridComponent;
    getExtensionByName(name: any): FlexGridExtension;
    register(name: any, component: any): void;
    unRegister(name: any): void;
    enableExtension(name: any): void;
    disableExtension(name: any): void;
    getAllExtensions(): Map<string, FlexGridExtension>;
}

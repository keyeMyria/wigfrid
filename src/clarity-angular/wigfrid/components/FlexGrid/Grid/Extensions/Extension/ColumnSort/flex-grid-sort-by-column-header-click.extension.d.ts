import { FlexGridExtensionsService } from "../../flex-grid-extensions.service";
import { FlexGridExtension } from "../flex-grid-extension";
export declare class FlexGridSortByColumnHeaderClickExtension extends FlexGridExtension {
    flexGridExtensionsService: FlexGridExtensionsService;
    extensionName: string;
    enabled: boolean;
    constructor(flexGridExtensionsService: FlexGridExtensionsService);
    indicatorRectangle: any;
    register(): void;
    unRegister(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}

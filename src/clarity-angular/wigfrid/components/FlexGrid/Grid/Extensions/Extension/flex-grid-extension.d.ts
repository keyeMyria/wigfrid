import { OnInit, OnDestroy } from "@angular/core";
import { FlexGridExtensionsService } from "../flex-grid-extensions.service";
export declare abstract class FlexGridExtension implements OnInit, OnDestroy {
    abstract extensionName: any;
    abstract flexGridExtensionsService: FlexGridExtensionsService;
    abstract enabled: any;
    enable(): void;
    disable(): void;
    register(): void;
    unRegister(): void;
    abstract ngOnInit(): any;
    abstract ngOnDestroy(): any;
}

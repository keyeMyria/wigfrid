import {OnInit, OnDestroy} from "@angular/core";
import {FlexGridExtensionsService} from "../flex-grid-extensions.service";
export abstract class FlexGridExtension implements OnInit, OnDestroy{

    public abstract extensionName;
    public abstract flexGridExtensionsService: FlexGridExtensionsService;

    public abstract enabled;

    public enable() {
        this.enabled = true;
    }

    public disable() {
        this.enabled = false;
    }

    public register() {
        this.flexGridExtensionsService.register(this.extensionName, this);
    }

    public unRegister() {
        this.flexGridExtensionsService.unRegister(this.extensionName);
    }

    public abstract ngOnInit();

    public abstract ngOnDestroy();


}

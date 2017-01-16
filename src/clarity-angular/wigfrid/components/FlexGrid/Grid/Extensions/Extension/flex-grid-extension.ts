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

    public abstract register();

    public abstract unRegister();

    public abstract ngOnInit();

    public abstract ngOnDestroy();


}

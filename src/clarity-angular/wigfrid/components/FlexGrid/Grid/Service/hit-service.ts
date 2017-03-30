

import {FlexGridComponent} from "../FlexGridComponent";
export class HitService {
    constructor(private grid: FlexGridComponent) {
        console.debug('hit service instantiate success');
    }

    public hitTestInfo;


    hitTest(e: MouseEvent) {
        this.hitTestInfo = this.grid.hitTest(e);
    }
}

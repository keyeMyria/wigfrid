

import {FlexGridDirective} from "../FlexGridDirective";
export class HitService {
    constructor(private grid: FlexGridDirective) {
        console.debug('hit service instantiate success');
    }

    public hitTestInfo;


    hitTest(e: MouseEvent) {
        this.hitTestInfo = this.grid.hitTest(e);
    }
}

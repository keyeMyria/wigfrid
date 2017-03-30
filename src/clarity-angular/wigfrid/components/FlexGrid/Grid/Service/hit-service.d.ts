import { FlexGridComponent } from "../FlexGridComponent";
export declare class HitService {
    private grid;
    constructor(grid: FlexGridComponent);
    hitTestInfo: any;
    hitTest(e: MouseEvent): void;
}

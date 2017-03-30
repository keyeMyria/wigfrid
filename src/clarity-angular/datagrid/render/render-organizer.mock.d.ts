import { Subject } from "rxjs/Subject";
import { DatagridRenderOrganizer } from "./render-organizer";
/**
 * Mock that gives direct access to the subjects, to trigger specific parts of the render cycle.
 */
export declare class MockDatagridRenderOrganizer extends DatagridRenderOrganizer {
    readonly clearWidths: Subject<any>;
    readonly tableMode: Subject<boolean>;
    readonly computeWidths: Subject<any>;
    readonly alignColumns: Subject<any>;
}
export declare const MOCK_ORGANIZER_PROVIDER: {
    provide: typeof DatagridRenderOrganizer;
    useClass: typeof MockDatagridRenderOrganizer;
};

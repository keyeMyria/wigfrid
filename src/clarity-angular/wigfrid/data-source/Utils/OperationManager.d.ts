export declare class OperationManager {
    _counter: number;
    _deferreds: {};
    add(deferred: any): number;
    remove(operationId: any): boolean;
    cancel(operationId: any): boolean;
}

export declare class RemoteQuery {
    private _url;
    private _queryOptions;
    private _tasks;
    private _taskQueue;
    private query;
    private _adapterFactory;
    constructor(adapterFactory: any, url: any, queryOptions: any, tasks: any);
    sortBy(): this;
    thenBy(): this;
    filter(): this;
    slice(): this;
    select(): this;
    groupBy(): this;
    /**
     */
    count(): any;
    min(): any;
    max(): any;
    sum(): any;
    avg(): any;
    aggregate(): any;
    enumerate(): any;
    private createTask(name, args);
    private exec(executorTask);
    private mergeSortTask(task);
    private unmergeSortTasks();
    private rejectWithNotify(error);
}

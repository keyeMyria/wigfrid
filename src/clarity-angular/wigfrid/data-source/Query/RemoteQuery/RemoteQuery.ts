import { Observable } from "rxjs";
import { ArrayQuery } from "../ArrayQuery/ArrayQuery";
import * as _ from "lodash";

export class RemoteQuery {
    private _url;

    private _queryOptions;
    private _tasks;
    private _taskQueue = [];

    private query = {};

    private _adapterFactory;

    constructor(adapterFactory, url, queryOptions, tasks) {
        this._tasks = tasks = tasks || [];
        this._queryOptions = queryOptions = queryOptions || {};
    }

    sortBy() {
        this._tasks.push(this.createTask('sort', arguments));
        return this;
    }

    thenBy() {
        this._tasks.push(this.createTask('thenBy', arguments));
        return this;
    }

    filter() {
        this._tasks.push(this.createTask('filter', arguments));
        return this;
    }

    slice() {
        this._tasks.push(this.createTask('slice', arguments));
        return this;
    }

    select() {
        this._tasks.push(this.createTask('select', arguments));
        return this;
    }

    groupBy() {
        this._tasks.push(this.createTask('groupBy', arguments));
        return this;
    }

    /**
     */
    count() {
        return this.exec(this.createTask('count', arguments))
    }

    min() {
        return this.exec(this.createTask('min', arguments));
    }

    max() {
        return this.exec(this.createTask('max', arguments));
    }

    sum() {
        return this.exec(this.createTask('sum', arguments));
    }

    avg() {
        return this.exec(this.createTask('avg', arguments));
    }

    aggregate() {
        return this.exec(this.createTask('aggregate', arguments));
    }

    enumerate() {
        return this.exec(this.createTask('enumerate', arguments));
    }

    private createTask(name, args) {
        return {
            name: name,
            args: args
        }
    };

    private exec(executorTask) {
        let _adapter, _currentTask, _mergedSortArgs;
        let _taskQueue = this._taskQueue;
        const queryOptions = this._queryOptions;

        try {
            //todo remove me
            // _adapterFactory = queryOptions.adapter;
            // if (!_.isFunction(_adapterFactory)) {
            //     _adapterFactory = queryAdapters[_adapterFactory]
            // }
            _adapter   = this._adapterFactory.setOptions(queryOptions);
            _taskQueue = [].concat(this._tasks).concat(executorTask);
            while (_taskQueue.length) {
                _currentTask = _taskQueue[0];
                //todo refactor
                if (!this.mergeSortTask(_currentTask)) {
                    if (_mergedSortArgs) {
                        _taskQueue.unshift(this.createTask("multiSort", [_mergedSortArgs]));
                        _mergedSortArgs = null;
                        continue
                    }
                    if ("enumerate" !== String(_currentTask.name)) {
                        if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
                            break
                        }
                    }
                }
                _taskQueue.shift()
            }
            this.unmergeSortTasks();

            let adapter = _adapter.exec(url);
            if (!_taskQueue.length) {
                return adapter;
            } else {
                return adapter.mergeMap(([result, extra]) => {
                    const clientChain = new ArrayQuery(result, {
                            errorHandler: queryOptions.errorHandler
                        }
                    );
                    _.forEach(_taskQueue, function (value) {
                        clientChain = clientChain[value.name].apply(clientChain, value.args)
                    });
                    return clientChain.enumerate
                })
            }
            // _adapter.exec(url).map(([result, extra]) => {
            //     if (!_taskQueue.length) {
            //         d.resolve(result, extra)
            //     } else {
            //         var clientChain = new ArrayQuery(result, {
            //             errorHandler: queryOptions.errorHandler
            //         });
            //         $.each(_taskQueue, function () {
            //             clientChain = clientChain[this.name].apply(clientChain, this.args)
            //         });
            //         return clientChain.done(d.resolve).fail(d.reject)
            //     }
            // }).fail(rejectWithNotify)
        } catch (x) {
            this.rejectWithNotify(x);
            return Observable.throw(x);
        }
    }

    private mergeSortTask(task) {
        switch (task.name) {
            case "sortBy":
                _mergedSortArgs = [task.args];
                return true;
            case "thenBy":
                if (!_mergedSortArgs) {
                    throw new Error("The thenby() method is called before the sortby() method")
                }
                _mergedSortArgs.push(task.args);
                return true
        }
        return false
    }


    private unmergeSortTasks() {
        let _taskQueue    = this._taskQueue;
        const head        = _taskQueue[0],
            unmergedTasks = [];
        if (head && "multiSort" === head.name) {
            _taskQueue.shift();
            _.forEach(head.args[0], function (value) {
                unmergedTasks.push(this.createTask(unmergedTasks.length ? "thenBy" : "sortBy", value))
            })
        }
        _taskQueue = unmergedTasks.concat(_taskQueue)
    }

    private rejectWithNotify(error) {
        const handler = this._queryOptions.errorHandler;
        if (handler) {
            handler(error)
        }
    }

}

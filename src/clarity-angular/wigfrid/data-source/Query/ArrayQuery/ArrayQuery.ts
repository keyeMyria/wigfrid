import { Observable } from "rxjs";
import { Iterator } from "./Iterator/Iterator";
import { ArrayIterator } from "./Iterator/ArrayIterator";
import { SortIterator } from "./Iterator/SortIterator";
import { SliceIterator } from "./Iterator/SliceIterator";
import { GroupIterator } from "./Iterator/GroupIterator";
import { SelectIterator } from "./Iterator/SelectIterator";
import { FilterIterator } from "./Iterator/FilterIterator";
import { compileGetter } from "../../Utils/Data";
import * as _ from "lodash";
import { $$observable } from "rxjs/symbol/observable";
import { Aggregators } from "./Aggregates";
import { Criteria } from "../Criteria/Criteria";
import { CriterionCompiler } from "./Compile/CriterionCompiler";

function chainQuery(iter, queryOptions) {
    return new ArrayQuery(iter, queryOptions)
};

export class ArrayQuery {

    constructor(protected iter, protected queryOptions: {errorHandler?: Function} = {}) {
        if (!(iter instanceof Iterator)) {
            this.iter = new ArrayIterator(iter)
        }

    }

    private toArray() {
        return this.iter.toArray()
    }

    enumerate(): Observable {
        return new Observable(observer => {
            observer.next(this.iter.toArray());
            observer.complete();
        }).catch(this.handleError);
    }

    [$$observable](): Observable {
        return new Observable(observer => {
            observer.next(this.iter.toArray());
            observer.complete();
        }).catch(this.handleError);
    }

    sortBy(sortDescriptions: any[]);

    sortBy(getter, desc) {
        if (_.isArray(getter) && desc === void 0) {
            return getter.reduce((prev, curr) => {
                return this.sortBy(curr[0], curr[1])
            }, null)
        }
        if (this.iter instanceof SortIterator) {
            return chainQuery(this.iter.thenBy(getter, desc), this.queryOptions);
        }
        return chainQuery(new SortIterator(this.iter, getter, desc), this.queryOptions)
    }

    thenBy(getter, desc) {
        if (this.iter instanceof SortIterator) {
            return chainQuery(this.iter.thenBy(getter, desc), this.queryOptions)
        }
        throw new Error("The thenby() method is called before the sortby() method")
    }

    filter(predicate) {
        if (!_.isFunction(predicate)) {
            throw new Error('predicate must be function');
        }
        return chainQuery(new FilterIterator(this.iter, predicate), this.queryOptions)
    }

    slice(skip, take) {
        if (void 0 === take) {
            take = Number.MAX_VALUE
        }
        return chainQuery(new SliceIterator(this.iter, skip, take), this.queryOptions)
    }

    groupBy(getter) {
        if (this.iter instanceof GroupIterator) {
            return chainQuery(this.iter.thenBy(getter), this.queryOptions)
        }
        return chainQuery(new GroupIterator(this.iter, getter), this.queryOptions)
    }

    select(getter) {
        if (!_.isFunction(getter) && !_.isArray(getter)) {
            getter = _.toArray(arguments)
        }
        getter = compileGetter(getter);
        return chainQuery(new SelectIterator(this.iter, getter), this.queryOptions)
    };

    aggregate(seed, reducer, finalize) {
        if (arguments.length < 2) {
            return this.aggregateCore({
                reducer: arguments[0]
            })
        }
        return this.aggregateCore({
            seed:     seed,
            reducer:  reducer,
            finalize: finalize
        })
    }

    count() {
        if (this.iter.countable()) {
            return new Observable(observer => {
                observer.next(this.iter.count())
            }).catch(this.handleError);
        }
        return this.standardAggregate("count")
    }

    sum(getter?) {
        if (getter) {
            return this.selectProp(getter).sum()
        }
        return this.standardAggregate("sum")
    }

    min(getter?) {
        if (getter) {
            return this.selectProp(getter).min()
        }
        return this.standardAggregate("min")
    }

    max(getter?) {
        if (getter) {
            return this.selectProp(getter).max()
        }
        return this.standardAggregate("max")
    }

    avg(getter?) {
        if (getter) {
            return this.selectProp(getter).avg()
        }
        return this.standardAggregate("avg")
    }

    private handleError(error) {
        const handler = this.queryOptions.errorHandler;
        if (handler) {
            handler(error)
        }
    }

    private aggregateCore(aggregator) {
        let seed;
        const reducer = aggregator.reducer,
            finalize  = aggregator.finalize;

        return new Observable(observer => {
            this.iter.reset();
            if ("seed" in aggregator) {
                seed = aggregator.seed
            } else {
                seed = this.iter.next() ? this.iter.current() : NaN
            }
            let accumulator = seed;
            while (this.iter.next()) {
                accumulator = reducer(accumulator, this.iter.current())
            }
            observer.next(finalize ? finalize(accumulator) : accumulator)
        }).catch(this.handleError);
    };


    private standardAggregate(name) {
        return this.aggregateCore(Aggregators[name])
    };

    private selectProp(name) {
        return this.select(compileGetter(name))
    };

    public matching(criteria: Criteria) {

        let criterionCompiler = new CriterionCompiler();
        //
        let CompiledCriteria  = criterionCompiler.compileCritera(criteria);

        let criterion = new CompiledCriteria();
        return criterion.match(this);
    }
}

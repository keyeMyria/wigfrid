import { Iterator } from "./Iterator";

export class WrappedIterator extends Iterator {
    protected iter;

    constructor(iter) {
        this.iter = iter
    }

    next() {
        return this.iter.next()
    }

    current() {
        return this.iter.current()
    }

    reset() {
        return this.iter.reset()
    }
}

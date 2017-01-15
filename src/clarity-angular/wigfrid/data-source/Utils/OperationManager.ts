/**
 * Created by LeBlanc on 16/8/6.
 */
const CANCELED_TOKEN = "canceled";

export class OperationManager {
    _counter   = -1;
    _deferreds = {};

    add(deferred) {
        this._counter += 1;
        this._deferreds[this._counter] = deferred;
        return this._counter
    };

    remove(operationId) {
        return delete this._deferreds[operationId]
    };

    cancel(operationId) {
        if (operationId in this._deferreds) {
            this._deferreds[operationId].reject(CANCELED_TOKEN);
            return true
        }
        return false
    }
}

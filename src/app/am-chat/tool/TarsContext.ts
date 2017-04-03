export class TarsContext {

    public fieldMap = new Map();

    public children;

    public setContext(name, context) {
        this.fieldMap.set(name, context);
    }
}

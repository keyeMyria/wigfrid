


export class TarsContext {

    public fieldMap = new Map();

    public setField(name, context) {
        this.fieldMap.set(name, context);
    }

    public fieldIsContext(name) {
        return this.fieldMap.get(name) instanceof TarsContext
    }


}


import { Criterion } from "../Criteria";
import { Getter } from "./Restrictions";
export class Group {

    public groupBy(groups) {
        let groups = groups.map(field => {
            return new GroupBy(field);
        });
        return groups;
    }
}

export class GroupBy implements Criterion {
    private field;

    constructor(field) {
        this.field = new Getter(field);
    }

    public getField() {
        return this.field;
    }

    visit() {

    }
}

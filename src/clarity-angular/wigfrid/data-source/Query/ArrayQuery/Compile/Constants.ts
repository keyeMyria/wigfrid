import * as o from "../../Query/Compile/Output/OutputAST";

export class CriterionClass {

    static className = o.variable('ComparisonClass');

    static filterTarget = o.variable('target');
}


export class FilterMethodClass {

    static filterMethod = o.variable('filterEntry');
}


export class OrderMethodClass {
    static orderMethod = o.variable('orderEntry');
}


export class GroupMethodClass {
    static groupMethod = o.variable('groupEntry');
}

export class MatchMethodClass {
    static matchMethod = o.variable('match');
}

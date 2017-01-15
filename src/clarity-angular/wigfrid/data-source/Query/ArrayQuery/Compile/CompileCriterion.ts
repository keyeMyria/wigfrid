import { FilterMethodClass, CriterionClass, MatchMethodClass } from "./Constants";
import * as o from "../../Query/Compile/Output/OutputAST";
import { CompileIdentifierMetadata } from "../../Query/Compile/compile_metadata";
export class CompileCriterion {

    public comparisonMethods: CompileMethod[] = [];

    public filterMethod: CompileMethod = new CompileMethod();

    // public orderMethod: CompileMethod = new CompileMethod();

    // public groupMethod: CompileMethod = new CompileMethod();

    public matchMethod: CompileMethod = new CompileMethod();

    public getterDependencies = [];

    public sortDescriptions: any[] = [];

    constructor() {

    }

    private generateConstructorMethod() {
        let getterStmts = [];
        // if (this.getterDependencies.length > 0) {
        //     getterStmts = this.getterDependencies.map((getterDependence, index) => {
        //         return o.THIS_EXPR.prop(`getter_${index}`)
        //             // .set(
        //             //     o.variable(`getters`).key(o.literal(index))
        //             // )
        //             .set(
        //                 o.importExpr(new CompileIdentifierMetadata({name: 'getter'})).key(o.literal(index))
        //             )
        //             .toStmt();
        //     });
        // }

        return new o.ClassMethod(
            null,
            [],
            [
                // ...getterStmts
                // e.SUPER_EXPR.callFn(superConstructorArgs).toStmt(),

            ])
    }

    private generateFilterMethod() {
        return new o.ClassMethod(
            FilterMethodClass.filterMethod.name,
            [new o.FnParam(CriterionClass.filterTarget.name)],
            this.filterMethod.finish()
        )
    }

    private generateComparisonMethod() {
        return this.comparisonMethods.map((comparisonMethod, index)=> {
            return new o.ClassMethod(
                `_comparison_${index}`,
                [new o.FnParam(CriterionClass.filterTarget.name)],
                comparisonMethod.finish()
            )
        });
    }

    // private generateOrderMethod() {
    //     if (this.orderMethod.isEmpty()) {
    //         return false
    //     } else {
    //         return new o.ClassMethod(
    //             OrderMethodClass.orderMethod.name,
    //             [new o.FnParam(CriterionClass.filterTarget.name)/*, desc*/],
    //             this.orderMethod.finish()
    //         )
    //     }
    // }

    // private generateGroupMethod() {
    //     if (this.groupMethod.isEmpty()) {
    //         return false;
    //     } else {
    //         return new o.ClassMethod(
    //             GroupMethodClass.groupMethod.name,
    //             [new o.FnParam(CriterionClass.filterTarget.name)],
    //             this.groupMethod.finish()
    //         )
    //     }
    // }

    private generateMatchMethod() {
        let execExpression = o.variable(`iterator`)
            .callMethod(`filter`, [
                o.THIS_EXPR
                    .prop(FilterMethodClass.filterMethod.name)
                    .callMethod('bind', [o.THIS_EXPR])
            ]);

        if (this.sortDescriptions.length > 0) {

            let sorts      = o.literalArr(
                this.sortDescriptions.map(sortDescription => {
                    return o.literalArr([
                        o.fn([new o.FnParam(CriterionClass.filterTarget.name)], [new o.ReturnStatement(sortDescription[0])]),
                        sortDescription[1]
                    ])
                })
            );
            execExpression = execExpression.callMethod(`sortBy`, [sorts])
        }

        // if (!this.orderMethod.isEmpty()) {
        //     execExpression = execExpression.callMethod(`sort`, [
        //
        //         // o.THIS_EXPR
        //         //     .prop(OrderMethodClass.orderMethod.name)
        //         //     .callMethod('bind', [o.THIS_EXPR])
        //     ])
        // }
        //
        // if (!this.groupMethod.isEmpty()) {
        //     execExpression = execExpression.callMethod(`group`, [
        //         o.THIS_EXPR
        //             .prop(GroupMethodClass.groupMethod.name)
        //             .callMethod('bind', [o.THIS_EXPR])
        //     ])
        // }

        return new o.ClassMethod(
            MatchMethodClass.matchMethod.name,
            [new o.FnParam(`iterator`)],
            [new o.ReturnStatement(execExpression)]
        )
    }

    private generateComparisonClass() {
        let classMethods = [
            this.generateMatchMethod(),
            this.generateFilterMethod(),
            ...this.generateComparisonMethod(),
        ];
        // if (this.sortDescriptions.length > 0) {
        //     // classMethods.push(order);
        // }
        let group = this.generateGroupMethod();
        if (group) {
            classMethods.push(group);
        }

        return new o.ClassStmt(
            CriterionClass.className.name, null, [], [],
            this.generateConstructorMethod(),
            classMethods
        );
    }

    public generate() {
        let classStmt = this.generateComparisonClass();
        return [
            classStmt,
            // o.variable(`comparisonClass`)
            //     .set(o.variable(`comparison_class`)
            //         .instantiate([]))
            //     .toStmt(),
            // new o.ReturnStatement(
            //     o.variable(`comparisonClass`)
            //         .prop(FilterMethodClass.filterMethod.name)
            //         .callMethod(`bind`, [o.variable(`comparisonClass`)])
            // )
        ]
    }

    // public generateOrderMethod() {
    //     return new o.ClassMethod(
    //         OrderMethodClass.orderMethod.name,
    //         [new o.FnParam(CriterionClass.filterTarget.name)],
    //         [
    //
    //         ]
    //     );
    // }

    public generateGroupMethod() {

    }

    public addGetterDependence(dependence) {
        let identifier = new CompileIdentifierMetadata({name: 'getter', reference: dependence});
        this.getterDependencies.push(identifier);
        return o.importExpr(identifier);

    }
}


export class CompileMethod {

    private _bodyStatements: o.Statement[] = [];


    addStmt(stmt: o.Statement) {
        this._bodyStatements.push(stmt);
    }

    addStmts(stmts: o.Statement[]) {
        this._bodyStatements = [...this._bodyStatements, ...stmts];
    }

    finish(): o.Statement[] {
        return this._bodyStatements;
    }

    isEmpty(): boolean {
        return this._bodyStatements.length === 0;
    }
}

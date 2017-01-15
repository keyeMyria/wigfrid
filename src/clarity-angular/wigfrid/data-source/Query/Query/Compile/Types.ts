//// Types
import { CompileIdentifierMetadata } from "./compile_metadata";
export enum TypeModifier {
    Const
}

export abstract class Type {
    constructor(public modifiers: TypeModifier[] = null) {
        if (!(modifiers)) {
            this.modifiers = [];
        }
    }
    abstract visitType(visitor: TypeVisitor, context: any): any;

    hasModifier(modifier: TypeModifier): boolean { return this.modifiers.indexOf(modifier) !== -1; }
}

export enum BuiltinTypeName {
    Dynamic,
    Bool,
    String,
    Int,
    Number,
    Function
}

export class BuiltinType extends Type {
    constructor(public name: BuiltinTypeName, modifiers: TypeModifier[] = null) { super(modifiers); }
    visitType(visitor: TypeVisitor, context: any): any {
        return visitor.visitBuiltintType(this, context);
    }
}

export class ExternalType extends Type {
    constructor(
        public value: CompileIdentifierMetadata, public typeParams: Type[] = null,
        modifiers: TypeModifier[] = null) {
        super(modifiers);
    }
    visitType(visitor: TypeVisitor, context: any): any {
        return visitor.visitExternalType(this, context);
    }
}


export class ArrayType extends Type {
    constructor(public of : Type, modifiers: TypeModifier[] = null) { super(modifiers); }
    visitType(visitor: TypeVisitor, context: any): any {
        return visitor.visitArrayType(this, context);
    }
}


export class MapType extends Type {
    constructor(public valueType: Type, modifiers: TypeModifier[] = null) { super(modifiers); }
    visitType(visitor: TypeVisitor, context: any): any { return visitor.visitMapType(this, context); }
}

export let DYNAMIC_TYPE  = new BuiltinType(BuiltinTypeName.Dynamic);
export let BOOL_TYPE     = new BuiltinType(BuiltinTypeName.Bool);
export let INT_TYPE      = new BuiltinType(BuiltinTypeName.Int);
export let NUMBER_TYPE   = new BuiltinType(BuiltinTypeName.Number);
export let STRING_TYPE   = new BuiltinType(BuiltinTypeName.String);
export let FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);


export interface TypeVisitor {
    visitBuiltintType(type: BuiltinType, context: any): any;
    visitExternalType(type: ExternalType, context: any): any;
    visitArrayType(type: ArrayType, context: any): any;
    visitMapType(type: MapType, context: any): any;
}

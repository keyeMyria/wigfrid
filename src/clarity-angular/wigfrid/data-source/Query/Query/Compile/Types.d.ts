import { CompileIdentifierMetadata } from "./compile_metadata";
export declare enum TypeModifier {
    Const = 0,
}
export declare abstract class Type {
    modifiers: TypeModifier[];
    constructor(modifiers?: TypeModifier[]);
    abstract visitType(visitor: TypeVisitor, context: any): any;
    hasModifier(modifier: TypeModifier): boolean;
}
export declare enum BuiltinTypeName {
    Dynamic = 0,
    Bool = 1,
    String = 2,
    Int = 3,
    Number = 4,
    Function = 5,
}
export declare class BuiltinType extends Type {
    name: BuiltinTypeName;
    constructor(name: BuiltinTypeName, modifiers?: TypeModifier[]);
    visitType(visitor: TypeVisitor, context: any): any;
}
export declare class ExternalType extends Type {
    value: CompileIdentifierMetadata;
    typeParams: Type[];
    constructor(value: CompileIdentifierMetadata, typeParams?: Type[], modifiers?: TypeModifier[]);
    visitType(visitor: TypeVisitor, context: any): any;
}
export declare class ArrayType extends Type {
    of: Type;
    constructor(of: Type, modifiers?: TypeModifier[]);
    visitType(visitor: TypeVisitor, context: any): any;
}
export declare class MapType extends Type {
    valueType: Type;
    constructor(valueType: Type, modifiers?: TypeModifier[]);
    visitType(visitor: TypeVisitor, context: any): any;
}
export declare let DYNAMIC_TYPE: BuiltinType;
export declare let BOOL_TYPE: BuiltinType;
export declare let INT_TYPE: BuiltinType;
export declare let NUMBER_TYPE: BuiltinType;
export declare let STRING_TYPE: BuiltinType;
export declare let FUNCTION_TYPE: BuiltinType;
export interface TypeVisitor {
    visitBuiltintType(type: BuiltinType, context: any): any;
    visitExternalType(type: ExternalType, context: any): any;
    visitArrayType(type: ArrayType, context: any): any;
    visitMapType(type: MapType, context: any): any;
}

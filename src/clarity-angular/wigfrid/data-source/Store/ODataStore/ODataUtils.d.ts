export declare const sendRequest: (protocolVersion: any, request: any, requestOptions: any, deserializeDates: any) => any;
export declare const interpretJsonFormat: (obj: any, textStatus: any, deserializeDates: any) => {
    error: any;
} | {
    data: any;
};
export declare class EdmLiteral {
    private _value;
    constructor(value: any);
    valueOf(): any;
}
export declare const serializePropName: (propName: any) => any;
export declare const serializeValue: (value: any, protocolVersion: any) => any;
export declare let serializeKey: (key: any, protocolVersion: any) => any;
export declare let keyConverters: {
    String: (value: any) => string;
    Int32: (value: any) => number;
    Int64: (value: any) => EdmLiteral;
    Guid: (value: any) => any;
    Boolean: (value: any) => boolean;
    Single: (value: any) => EdmLiteral;
    Decimal: (value: any) => EdmLiteral;
};

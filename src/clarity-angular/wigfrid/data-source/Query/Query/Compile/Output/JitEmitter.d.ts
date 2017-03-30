import * as o from './OutputAST';
export declare function sanitizeIdentifier(name: string): string;
export declare function jitStatements(sourceUrl: string, statements: o.Statement[], resultVar: string): any;

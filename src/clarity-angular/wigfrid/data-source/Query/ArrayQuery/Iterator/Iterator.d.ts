export declare abstract class Iterator {
    toArray(): any[];
    countable(): boolean;
    abstract reset(): any;
    abstract next(): any;
    abstract current(): any;
}

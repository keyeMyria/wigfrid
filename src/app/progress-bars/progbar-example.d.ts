export declare class ProgBarExample {
    private label;
    private title;
    private isLabeled;
    intervalId: any;
    demoId: string;
    value: number;
    intervalTimeInMs: number;
    constructor(label?: string, title?: string, isLabeled?: boolean);
    cssClassnames(): string;
    stop(): void;
    reset(): void;
    start(): void;
    run(): void;
}

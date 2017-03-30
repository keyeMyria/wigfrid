export declare class MockData {
    data: any;
    generate(): {
        id: number;
        country: string;
        date: Date;
        amount: number;
        active: boolean;
    }[];
}

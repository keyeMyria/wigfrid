import { DomAdapter } from "./dom-adapter";
export declare class MockDomAdapter extends DomAdapter {
    _userDefinedWidth: number;
    userDefinedWidth(element: any): number;
    _scrollBarWidth: number;
    scrollBarWidth(element: any): number;
    _scrollWidth: number;
    scrollWidth(element: any): number;
}
export declare const MOCK_DOM_ADAPTER_PROVIDER: {
    provide: typeof DomAdapter;
    useClass: typeof MockDomAdapter;
};

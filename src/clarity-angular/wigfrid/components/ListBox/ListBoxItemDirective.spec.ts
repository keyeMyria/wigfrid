import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';
import { ListBoxItemDirective } from './ListBoxItemDirective';

beforeEachProviders(() => [ListBoxItemDirective]);

describe('Ahri: ListBoxItemDirective', () => {
    beforeEach(() => {
        // disposePlatform();
        //
        // fakeDoc = getDOM().createHtmlDocument();
        // el = getDOM().createElement('hello-app', fakeDoc);
        // el2 = getDOM().createElement('hello-app-2', fakeDoc);
        // lightDom = getDOM().createElement('light-dom-el', fakeDoc);
        // getDOM().appendChild(fakeDoc.body, el);
        // getDOM().appendChild(fakeDoc.body, el2);
        // getDOM().appendChild(el, lightDom);
        // getDOM().setText(lightDom, 'loading');
        // testProviders =
        //   [provide(DOCUMENT, {useValue: fakeDoc}), provide(Console, {useClass: DummyConsole})];
    });


    // it('should create the ListBoxItemDirective', () => {
    //         inject([ListBoxItemDirective], (app: ListBoxItemDirective) => {
    //             expect(app).toBeTruthy();
    //         })
    //     }
    // );

});

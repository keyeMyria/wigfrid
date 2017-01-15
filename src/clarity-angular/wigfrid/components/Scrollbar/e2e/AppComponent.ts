
import {Component} from "@angular/core";
import {SlimScroll} from "../SlimScroll";
/**
 *
 */
@Component({
    selector: 'app',
    template: `
    <ar-slim-scroll></ar-slim-scroll>
`,
    directives: [SlimScroll]
})
export class AppComponent {
    constructor() {

    }
}

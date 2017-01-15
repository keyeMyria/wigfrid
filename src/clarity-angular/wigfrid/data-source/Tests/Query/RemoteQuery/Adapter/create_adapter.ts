
import { ODataQueryAdapter } from "../../../../Query/RemoteQuery/Adapter/ODataQueryAdapter";
describe('OData Query Adapter', ()=> {
    it('create Odata query adapter', () => {
        let adapter = new ODataQueryAdapter();
        adapter.setOptions({});
        adapter.exec('');
    })
});

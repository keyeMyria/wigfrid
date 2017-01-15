import { RemoteQuery } from "../../../Query/RemoteQuery/RemoteQuery";
import { ODataQueryAdapter } from "../../../Query/RemoteQuery/Adapter/ODataQueryAdapter";

xdescribe('create remote query', () => {
    it('create remote query', (done) => {
        let queryAdapter = new ODataQueryAdapter();
        let remoteQuery  = new RemoteQuery(queryAdapter, './data/create.json', {}, []);

        remoteQuery.avg().subscribe(_ => {
            expect(_).toEqual(1);
            done();
        })
    });

});

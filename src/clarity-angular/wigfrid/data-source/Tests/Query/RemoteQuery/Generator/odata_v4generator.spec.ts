import { ODataV4Generator } from "../../../../Query/RemoteQuery/Adapter/ODataV4Generator";
/**
 * Created by LeBlanc on 16/9/2.
 */

xdescribe('odata v4 generator', () => {
    it('create expand v4 odata generator', () => {
        let odataGenerator = new ODataV4Generator({
            expand: ['filter.aaa,string', 'group.bbb'],
            // select: ['filter.aaa', 'group.bbb']
        });

        let generatedString = odataGenerator.generate();
        expect(generatedString).toEqual('filter($expand=aaa),group($expand=bbb)');
    });

    it('create select v4 odata generator', () => {
        let odataGenerator = new ODataV4Generator({
            select: ['filter.aaa sort.abc', 'group.bbb']
        });

        let generatedString = odataGenerator.generate();
        expect(generatedString).toEqual('filter($select=aaa),group($select=bbb)');
    })
});

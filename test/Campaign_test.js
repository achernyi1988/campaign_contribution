const assert = require("assert");
const ganache = require ("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const  compiledFactory = require("../ethereum/build/CampaignFactory.json");
const  compiledCamplaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0], gas: "1000000"});

    await factory.methods.createCampaing("100").send({
            from: accounts[0],
            gas: "1000000"
        }
    );

    [campaignAddress] = await factory.methods.getDeployedCampaign().call();


    campaign = await  new web3.eth.Contract(JSON.parse(compiledCamplaign.interface), campaignAddress);


});
describe("Campaign ", () => {
   it("deploy a factory and a campaign",() => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
   })
    it("is manager?",async () => {
        const manager = await campaign.methods.manager().call();
        assert.strictEqual(manager, accounts[0]);
    })
    it("allows people to contribute money and mark as approvals", async () =>{

        await campaign.methods.contribute().send({
            value: "200",
            from: accounts[1]

        });

        await campaign.methods.createRequest("buy water", "200", accounts[5]).send({from: accounts[0], gas: "1000000"});

        await  campaign.methods.approveRequest(0).send( {from : accounts[1]});

        const  isApprovals  = await campaign.methods.appoversMap(accounts[1]).call();

        assert.ok(isApprovals);

        await  campaign.methods.finalizeRequest(0).send( {from : accounts[0]});

        const requestArr  = await campaign.methods.requestArr(0).call();

        assert.ok(requestArr.complete);
    });

    it("minimum required contribution", async ()=> {
        let isTestValid = false;
        try {
            await  campaign.methods.contribute().send( {value: "50", from : accounts[1]}); // minimum 100

        }catch (err) {
            isTestValid = true;
        }
        assert(isTestValid);
    });

});
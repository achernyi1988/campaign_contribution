import web3 from "./web3";
import campaignFactory from "../ethereum/build/CampaignFactory";


export let factory;

export function create(address){

    factory = new web3.eth.Contract(
            JSON.parse(campaignFactory.interface),
            address
        );

    console.log("export function create factory = ", factory);
}

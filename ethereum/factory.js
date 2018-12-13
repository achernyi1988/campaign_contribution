import web3 from "./web3";
import campaignFactory from "../ethereum/build/CampaignFactory";

 const instance = new web3.eth.Contract(
     JSON.parse(campaignFactory.interface),
     "0x7a24cD6eafA781aF3b34940c0e75fD5B879B63A7"
 );

 export default instance;
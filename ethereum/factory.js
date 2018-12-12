import web3 from "./web3";
import campaignFactory from "../ethereum/build/CampaignFactory";

 const instance = new web3.eth.Contract(
     JSON.parse(campaignFactory.interface),
     "0x72d760037699DF0f19573F5E948dACF76c268842"
 );

 export default instance;
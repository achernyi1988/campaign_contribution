import web3 from "./web3";
import campaignFactory from "../ethereum/build/CampaignFactory";

 const instance = new web3.eth.Contract(
     JSON.parse(campaignFactory.interface),
     "0x4f3e8F5ee21070AcA5D67254A4648A9a20021554"
 );

 export default instance;
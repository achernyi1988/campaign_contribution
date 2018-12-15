import web3 from "./web3";
import campaignFactory from "../ethereum/build/CampaignFactory";

 const instance = new web3.eth.Contract(
     JSON.parse(campaignFactory.interface),
     "0xAB63C67e4a971dc42b91f1C90AfbcDd059fd1eEa"
 );

 export default instance;
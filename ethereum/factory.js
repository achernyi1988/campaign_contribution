import web3 from "./web3";



import campaignFactory from "../ethereum/build/CampaignFactory";

 const instance = new web3.eth.Contract(
     JSON.parse(campaignFactory.interface),
     "0x429C54f1159DFcd63fbB9DA70275ebe5118afeab"
 );

 export default instance;
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import factory from "../ethereum/factory";

class CampaignIndex extends Component{
    async componentDidMount(){
        const campaign = await factory.methods.getDeployedCampaign().call();
        console.log(campaign);
    }

    render(){
        return <div>Campaigns Index</div>;
    }
}


export default CampaignIndex;
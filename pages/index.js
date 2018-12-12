import React, {Component} from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component{

    //special for nextjs to render.
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();
        return {campaigns};
    }

    render(){
        return <div>{this.props.campaigns[0]}</div>;
    }

}


export default CampaignIndex;
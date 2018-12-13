import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card} from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import Layout from "../components/layout";

class CampaignIndex extends Component{

    //special for nextjs to render.
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();
        return {campaigns};
    }

    renderCampaings(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });
        return <Card.Group items={items} />;
    }

    render(){
        return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>

                <Button
                    content="Create Campaign"
                    icon="add circle"
                    primary
                    floated={"right"}
                />
                {this.renderCampaings()}
            </div>
        </Layout>
        );

    }

}


export default CampaignIndex;
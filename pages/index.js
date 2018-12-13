import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card} from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import Layout from "../components/layout";
import { Link } from "../routes";

class CampaignIndex extends Component{

    //special for nextjs to render.
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();
        return {campaigns};
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaign/${address}`}><a>View Campaign</a></Link>
                ),
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

                <Link route={"/campaign/new"}>
                    <a className={"item"}>
                        <Button
                            content="Create Campaign"
                            icon="add circle"
                            primary
                            floated={"right"}
                        />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </div>
        </Layout>
        );

    }

}


export default CampaignIndex;
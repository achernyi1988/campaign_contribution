import React, {Component} from "react";
import {factory, create} from "../ethereum/factory";
import {Card} from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import Layout from "../components/layout";
import {Link, Router} from "../routes";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class CampaignIndex extends Component{

    campaigns = "";

    state = {
        usersLoaded: false
    }

    componentDidMount() {

        console.log("CampaignIndex::componentDidMount");


        fetch('/get-contract-address')
            .then(res => res.json())
            .then(async data =>  {

                create(data.value);
                console.log("CampaignIndex data = ", data.value + " factory = ", factory);


                this.campaigns = await factory.methods.getDeployedCampaign().call();

                console.log("CampaignIndex campaigns = ", this.campaigns);

                this.setState({
                    usersLoaded: true
                });

            });

    }
    //
    // // //special for nextjs to render.
    // static async getInitialProps(){
    //     console.log("CampaignIndex::getInitialProps");
    //
    //
    //     return {
    //         usersLoaded: false
    //     }
    // }

    renderCampaigns(){
        const items = this.campaigns.map(address => {
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

    onAction = async()=>{
        fetch('/set-contract-address',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstParam: '1',
                    secondParam: '2',
                })
            }).then(res => res.json())
            .then(async data => {
                console.log(`onAction value_1 =  ${data.value_1} value_2 = ${data.value_2} `);
            });
    }

    render(){

        if(this.state.usersLoaded ) {
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
                        <Button color="teal" basic onClick={this.onAction}>set address</Button>
                    </div>
                </Layout>
            );
        }
        else{
            console.log("CampaignIndex::render usersLoaded is not ready");
            return  <div> </div>;

        }
    }

}


export default CampaignIndex;
import React , {Component} from "react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import {Card, Grid, Button} from "semantic-ui-react"
import web3 from "../../ethereum/web3"
import ContributeForm from "../../components/contributeForm"
import {Link} from "../../routes"

class CampaignShow extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution : summary[0],
            balance : summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards(){

        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager, //this.props.manager
                meta : "address of manager",
                description: "the manager created this campaign and can create requests to withdraw money",
                style:{overflowWrap: "break-word"}
            },
            {
                header: minimumContribution,
                meta : "minimum Contribution(wei)",
                description: "You must contribute at least this much wei to become an approver"
            },
            {
                header: requestsCount,
                meta : "Number of requests",
                description: "A request tries to withdraw money from the cotract.Must be approved by contributions"
            },
            {
                header: approversCount,
                meta : "Number of approvers",
                description: "Number of people who have already donate to this contract",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta : "Campaign Balance (ether)",
                description: "the balance is how much money this campaign has left spend",
            }

        ]
        return <Card.Group items={items}/>
    }

    render(){
        return (
            <Layout>
                <h3> View Campaign </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={ this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaign/${this.props.address}/requests`}>
                                <a>
                                    <Button primary> View Requests </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>




            </Layout>);
    }
}

export default CampaignShow;
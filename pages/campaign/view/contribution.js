import React, {Component} from "react"
import Layout from "../../../components/layout";
import  {Table} from 'semantic-ui-react'
import ContributedRow from "../../../components/ContributedRow"
import Campaign from "../../../ethereum/campaign";
import {Link} from "../../../routes"

class ContributionView extends Component{

    static async getInitialProps(props){

        const address = props.query.address;
        const campaign = Campaign(address);

        const size = await campaign.methods.getContributorAddressCount().call();
        let contributionsArr  = [];

        for(let i = 0; i < size; ++i){
            let address = await campaign.methods.contributorAddress(i).call();
            let amount = await campaign.methods.contributorAmount(address).call();
            console.log(`address = ${address} amount = ${amount}`);
            contributionsArr.push({address, amount});
        }

        console.log("contributionsArr = ", contributionsArr);
        return {address: address, contributionsArr};
    }

    renderRows(){
        return this.props.contributionsArr.map((contributor, index) =>{
            return <ContributedRow
                    key={index}
                    id={index}
                    contributor={contributor}
                />
        })
    }

    render(){
        return(
            <Layout>
                <Link route = {`/campaign/${this.props.address}`}>
                    <a>
                        Back
                    </a>
                </Link>
                <div>Contribution View</div>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Contributed Amount Ether</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>

            </Layout>

        )
    }
}

export  default ContributionView;
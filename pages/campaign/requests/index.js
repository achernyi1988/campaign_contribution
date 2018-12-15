import React, {Component} from "react";
import Campaign from "../../../ethereum/campaign";
import Layout from "../../../components/layout";
import  {Table, Button} from 'semantic-ui-react'
import RequestRow from "../../../components/RequestRow";
import {Link} from "../../../routes"
class RequestIndex extends Component{

    static async getInitialProps(props){
        console.log("RequestIndex getInitialProps props.query.address = ", props.query.address);
        const campaign = Campaign(props.query.address);
        const approversCount = await campaign.methods.approversCount().call();
        const requestSize = await campaign.methods.getRequestCount().call();
        let  requests = [];
        for(let i = 0; i < requestSize; i++){
            requests.push(await campaign.methods.requestArr(i).call());
        }

        // description: requests[0].description,
        //     value : requests[0].value,
        //     recipient : requests[0].recipient,
        //     approvalsCounter: requests[0].approvalsCounter,
        //     complete: requests[0].complete,

        return {
            requests,
            approversCount,
            address: props.query.address,
        };
    }

    renderRows(){
        return this.props.requests.map( (request, index) => {
            return <RequestRow
                key={index}
                id={index}
                approversCount={this.props.approversCount}
                request={request}
                address={this.props.address}
            />
            }

        )
    }
    render(){
        return (
            <Layout>
                <h3> Pending Request/s</h3>
                <Link route={`/campaign/${this.props.address}/requests/new`}>
                <a>
                    <Button primary floated={"right"} style = {{marginBottom:"20px"}}>Add Request</Button>
                </a>
                </Link>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>id</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <h5>Found {this.props.requests.length} Request/s</h5>
            </Layout>
        );
    }
}

export default RequestIndex;
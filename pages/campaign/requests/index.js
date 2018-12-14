import React, {Component} from "react";
import Campaign from "../../../ethereum/campaign";
import Layout from "../../../components/layout";
import  {Table} from 'semantic-ui-react'
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const approversCount = await campaign.methods.approversCount().call();
        const requestSize = await campaign.methods.getRquestCount().call();
        let  requests = [];
        for(let i = 0; i < requestSize; i++){
            requests.push(await campaign.methods.requestArr(i).call());
        }

        // description: requests[0].description,
        //     value : requests[0].value,
        //     recipient : requests[0].recipient,
        //     approvalsCounter: requests[0].approvalsCounter,
        //     complete: requests[0].complete,

        console.log(requests[0].description);
        return {
            requests,
            approversCount,
            address: props.query.address
        };
    }

    renderRows(){
        return this. props.requests.map( (request, index) => {
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
                <h3> Request List</h3>
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
            </Layout>
        );
    }
}

export default RequestIndex;
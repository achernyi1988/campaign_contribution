import React, {Component} from "react"
import  {Table, Button} from 'semantic-ui-react'
import  web3 from '../ethereum/web3'
import Campaign from "../ethereum/campaign"


class RequestRow extends Component{

    onApprove = async () =>{
        console.log("onApprove");
         const accounts = web3.eth.getAccounts();
         const campaign = Campaign(this.props.address);
         await campaign.methods.approveRequest(0).send({
                                from:accounts[0]
                                });
    }

    render(){
    return (
            <Table.Row>
                <Table.Cell>{this.props.id + 1}</Table.Cell>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.request.value,"ether")}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.approvalsCounter}/{this.props.approversCount}</Table.Cell>
                <Table.Cell>
                    <Button color = "green" basic onClick={this.onApprove}>Approve</Button>
                </Table.Cell>
                <Table.Cell>Cell</Table.Cell>
            </Table.Row>
    );
    }
}

export default RequestRow;
import React, {Component} from "react"
import  {Table, Button} from 'semantic-ui-react'
import  web3 from '../ethereum/web3'
import Campaign from "../ethereum/campaign"
import {Router} from "../routes"


class RequestRow extends Component{

    static async getInitialProps(props){
        return {address: props.query.address};
    }

    onApprove = async () =>{
        try{
         const accounts = await web3.eth.getAccounts();
         const campaign = Campaign(this.props.address);

         await campaign.methods.approveRequest(this.props.id).send({from: accounts[0]});
            Router.pushRoute(`/campaign/${this.props.address}/requests`);
        }catch(e){
            console.log("error",e.message);
        }

    }
    onFinalize = async()=>{
        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);

            await campaign.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
            Router.pushRoute(`/campaign/${this.props.address}/requests`);
        }catch(e){
            console.log("error",e.message);
        }
    }

    render(){
        const readyToFinalyze =this.props.request.approvalsCounter > this.props.approversCount/2;
    return (
            <Table.Row disabled={this.props.request.complete}
                       positive={readyToFinalyze && !this.props.request.complete}>
                <Table.Cell>{this.props.id + 1}</Table.Cell>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.request.value,"ether")}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.approvalsCounter}/{this.props.approversCount}</Table.Cell>
                <Table.Cell>
                    {
                        this.props.request.complete ? null : (

                            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                        )
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        this.props.request.complete ? null : (
                            <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
                        )
                    }
                </Table.Cell>
            </Table.Row>
    );
    }
}

export default RequestRow;
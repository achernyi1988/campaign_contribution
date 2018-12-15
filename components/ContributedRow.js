import React, {Component} from "react"
import  {Table} from 'semantic-ui-react'
import web3 from "../ethereum/web3"


class RequestRow extends Component{

    render(){
    return (
            <Table.Row >
                <Table.Cell>{this.props.id + 1}</Table.Cell>
                <Table.Cell>{this.props.contributor.address}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(this.props.contributor.amount,"ether")}</Table.Cell>
            </Table.Row>
    );
    }
}

export default RequestRow;
import React, {Component} from "react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/layout";
import  {Form, Button, Message, Input} from 'semantic-ui-react'
import {Link, Router} from "../../../routes"

class RequestNew extends Component{

    state= {
        value:"",
        description: "",
        recipient:"",
        loading:false,
        errorMessage:""
    };

    static async getInitialProps(props){
        return {address: props.query.address};
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessages : ""});
        const campaign = Campaign(this.props.address);
        console.log("this.props.address == ", this.props.address);
        console.log("campaign == ", campaign);

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(this.state.description,
                                                 web3.utils.toWei(this.state.value,"ether"),
                                                 this.state.recipient).send({
                from:accounts[0]
            })
            Router.pushRoute(`/campaign/${this.props.address}/requests`);
        }catch(e){
            this.setState({errorMessages : e.message});
        }
        this.setState({loading: false});

    }

    render(){
        return(
            <Layout>
                <Link route={`/campaign/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                    </Link>
                <h3>Create a Request</h3>
                <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessages}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value = {this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value = {this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient </label>
                        <Input
                            value = {this.state.recipient}
                            onChange={event => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Opps" content={this.state.errorMessages}/>
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;
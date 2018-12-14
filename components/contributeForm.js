import React, {Component} from "react";
import  {Form, Input, Message, Button} from "semantic-ui-react";
import {Router} from "../routes";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


class ContributeForm  extends Component{

    state = {
      value:"",
      errorMessages:"",
      loading: false
    };
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading:true, errorMessages:""});

        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
                }
            )
            Router.replaceRoute(`/campaign/${this.props.address}`);
        }catch (e) {
            this.setState({errorMessages: e.message})
        }
        this.setState({loading:false, value: ""});
    };
    render()
    {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessages}>
                <Form.Field >
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header={"Oops!"} content={this.state.errorMessages} />
                <Button loading={this.state.loading} primary > Contribute!</Button>

            </Form>

        );
    }

}

export default ContributeForm;
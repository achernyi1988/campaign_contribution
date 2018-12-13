import React , {Component} from "react";
import Layout from "../../components/layout";
import {Form, Button, Input, Message} from "semantic-ui-react"
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";


class CampaignNew extends Component{
    state = {
        minimumContribution: "",
        errorMessages:"",
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        this.setState({loading:true, errorMessages:""});
        try {

        const accounts = await web3.eth.getAccounts();

        console.log("accounts = ", accounts);

        await factory.methods.createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
        }catch (e) {
            this.setState({errorMessages: e.message})
        }
        this.setState({loading:false});
    };


    render(){
        return(
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessages}>
                    <Form.Field>
                        <label> minimum Contribution</label>
                        <Input
                            label={"wei"}
                            labelPosition={"right"}
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header={"Oops!"} content={this.state.errorMessages} />
                    <Button loading={this.state.loading} primary> create! </Button>
                </Form>
            </Layout>
        );
    }
};

export default  CampaignNew;
import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button,Input} from "semantic-ui-react";
import Layout from "../components/layout";

import { Link } from "../routes";
import {addSchedule, removeSchedule, clearAllSchedule} from "./scheduleJob"

console.log("CampaignIndex");
class CampaignIndex extends Component{


    constructor(props){
        super(props);
        addSchedule(0,1);
        addSchedule(1,10);
        addSchedule(2,20);
        addSchedule(3,25);
        addSchedule(4,30);
        addSchedule(5,40);
        addSchedule(6,45);
        addSchedule(7,52);
        addSchedule(8,59);
    }

    state = {
        removeIndex: "",
        addIndex:"",
        addSecond:""
    }

    //special for nextjs to render.
    static async getInitialProps(){

        const campaigns = await factory.methods.getDeployedCampaign().call();
        return {campaigns};
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaign/${address}`}><a>View Campaign</a></Link>
                ),
                fluid: true
            }
        });
        return <Card.Group items={items} />;
    }
    onRemoveJob = () => {
        console.log("removeIndex id = ", this.state.removeIndex);
        removeSchedule(this.state.removeIndex);
    }

    onAddJob = () => {
        console.log("addIndex id = " + this.state.addIndex + "addSecond = "+ this.state.addSecond);
        addSchedule(this.state.addIndex, this.state.addSecond);
    }
    onClearAllSchedule = () => {
        console.log("clearAllSchedule");
        clearAllSchedule();
    }
    render(){

        return (<div>
            <h3>Hi</h3>
                <Input
                    label={"remove index"}
                    value={this.state.removeIndex}
                    onChange={event => this.setState({removeIndex: Number(event.target.value)})}
                />
                <Button onClick={this.onRemoveJob} >Remove Schedule Job</Button>
                <br></br><br></br><br></br>
                <Input
                    label={"add index"}
                    value={this.state.addIndex}
                    onChange={event => this.setState({addIndex: Number(event.target.value)})}
                />
                <br></br>
                <Input
                    label={"add second"}
                    value={this.state.addSecond}
                    onChange={event => this.setState({addSecond: Number(event.target.value)})}
                />

                <Button onClick={this.onAddJob} >Add Schedule Job</Button>
                <Button onClick={this.onClearAllSchedule} >Clear all schedule jobs</Button>
            </div>
        );

    }

}


export default CampaignIndex;
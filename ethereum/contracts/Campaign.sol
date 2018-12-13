pragma solidity ^0.4.17;


contract CampaignFactory{

    address [] public deployedCampaign;

    function createCampaign(uint minimumContribution) public {
        deployedCampaign.push(new Campaign(minimumContribution, msg.sender));
    }

    function getDeployedCampaign() public view returns(address[]){
        return deployedCampaign;
    }
}

contract Campaign {

    struct RequestContex{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCounter;
        mapping (address => bool) votes;
    }
    address public manager;
    uint public minimumContribution;
    mapping (address => bool) public appoversMap;
    uint public approversCount;
    RequestContex [] public requestArr;

    function Campaign (uint minimum,  address creator) public {
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        appoversMap[msg.sender] = true;

        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
    public  restrictedManager {
        RequestContex memory newRequest =  RequestContex ({description: description,
            value: value,
            recipient:recipient,
            complete:false,
            approvalsCounter:0
            });

        requestArr.push(newRequest);
    }
    function approveRequest(uint index) public  {
        RequestContex storage request = requestArr[index];

        require(appoversMap[msg.sender]);
        require(!requestArr[index].votes[msg.sender]);

        request.approvalsCounter++;
        request.votes[msg.sender] = true;
    }

    function finalizeRequest(uint index) public  restrictedManager {
        RequestContex storage request = requestArr[index];

        require(!request.complete);
        require(request.approvalsCounter > approversCount/2);

        request.recipient.transfer(request.value);

        request.complete = true;

    }

    function getSummary() public view returns (
                  uint,uint,uint,uint,address )
    {
        return (
            minimumContribution,
            this.balance,
            requestArr.length,
            approversCount,
            manager
        );
    }

    function getRquestCount() public view returns(uint){
        return requestArr.length;
    }

    modifier restrictedManager () {
        require(msg.sender == manager);
        _;
    }


}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CrowdFunding {

    Project[] public projects;

    constructor() {
        // init the projects array with one empty project so the id starts from 1
        Project memory project;
        projects.push(project);
    }

    struct Project {
        address owner;
        string title;
        string description;
        uint target;        //wei
        uint collected;     //wei
        uint withdrawed;    //wei
        uint deadline;      //timestamp(second)
    }

    modifier onlyOwner(uint id) {
        require(msg.sender == projects[id].owner, "only owner can call this function");
        _;
    }

    function withdraw(uint id, uint amount) public onlyOwner(id) {
        require(projects[id].withdrawed + amount <= projects[id].collected,
                "there is no enough balance to withdraw");
        projects[id].withdrawed += amount;
        // https://docs.soliditylang.org/en/v0.8.24/types.html#address
        // https://docs.soliditylang.org/en/v0.8.24/types.html#members-of-addresses
        payable(msg.sender).transfer(amount);
    }

    /**
     * @param deadline timestamp(second)
     */
    function createProject(
        string memory title,
        string memory description,
        uint target,
        uint deadline
    ) public returns (uint id) {
        require(deadline > block.timestamp, "deadline must be in the future");
        require(target > 0, "target must be bigger than 0");

        //`projects.push()` creates a new `Project` instance and returns the reference to it
        Project storage project = projects.push();
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.target = target;
        project.deadline = deadline;
        return projects.length - 1;
    }

    function totalCollected() public view returns (uint) {
        uint total = 0;
        for(uint id = 1; id < projects.length; id++){
            total += projects[id].collected;
        }
        return total;
    }

    function donate(uint id) public payable {
        require(msg.value > 0, "donate amount can't be zero");
        projects[id].collected += msg.value;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}

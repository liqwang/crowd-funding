// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract CrowdFunding {
    function createProject(
        string memory title
    ) public pure {
        console.log("Project created with title: %s", title);        
    }
}

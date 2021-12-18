//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
  //define var
  uint256 totalWaves;
  uint[] users; 

  constructor() {
    console.log("First Ethereum smart contract! :)");
  }
  //fx to increment wave counter
  function wave() public {
    totalWaves += 1;
    console.log("%s has waved!", msg.sender);
  }
  
  //fx to log total waves
  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
  
//how would you push each addy to an array and console log it?
  // function push(uint i) public {
  //   users.push(i);
  // }

  // function getUsers() public view returns () {
  //   return users;
  // }

} 
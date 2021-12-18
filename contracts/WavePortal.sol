//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
  //define var
  uint256 totalWaves;

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

} 
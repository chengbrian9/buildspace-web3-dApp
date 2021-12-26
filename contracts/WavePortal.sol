//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract WavePortal {

  //define var
  uint256 totalWaves;
  
  event NewWave(address indexed from, uint256 timestamp, string message);
  
  //create a wave struct to store data from each wave
  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  //create arr of structs 
  Wave[] waves;

  constructor() payable {
    console.log("First Ethereum smart contract! :)");
  }

  //fx to increment wave counter
  function wave(string memory _message) public {
    totalWaves += 1;
    console.log("%s has waved with message %s", msg.sender, _message);
    //push struct w/ data to arr
    waves.push(Wave(msg.sender, _message, block.timestamp));
    //emit new wave event 
    emit NewWave(msg.sender, block.timestamp, _message);
    uint256 prizeAmount = 0.0001 ether;
    require(
      prizeAmount <= address(this).balance,
      "Trying to withdraw more money than the contract has."
    );
    (bool success, ) = (msg.sender).call{value: prizeAmount}("");
    require(success, "Failed to withdraw money from contract.");
  }
  
  //fx to get all structs in wave arr
  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }

  //fx to log total waves
  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
} 
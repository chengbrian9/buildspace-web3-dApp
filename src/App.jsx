import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/wavePortals.json';

export default function App() {   
  const [currentAccount, setAccount] = useState("")
  const [ allWaves, setAllWaves ] = useState([]);
  const contractAddress = "0x434751C0121DAACE59761c99d6F5d9b561dDb795"
  const contractABI = abi.abi
 
 const getAllWaves = async () => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let waves = await wavePortalContract.getAllWaves();
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletConnected = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the Ethereum object.', ethereum);
      }
      const accounts = await ethereum.request({method: 'eth_accounts'});

      if (accounts.length > 0) {
        const account = accounts[0]
        console.log('Found an authorized account ', account)
        getAllWaves();
      } else {
        console.log('No authorized account found')
      }
    } catch(error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        alert("get Metamask foo!")
        return;
      } 
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    console.log("Successfully connected Metamask wallet ", accounts[0]);
    setAccount(accounts[0]);
  } catch (error) {
      console.log(error);
    }     
  }

 
  const wave = async (message) => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        const waveTxn = await wavePortalContract.wave(message, {gasLimit: 300000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log('Failed')
      }
    } catch (error) {
      console.log(error);
    }
  }

   
  useEffect(() => {
    checkIfWalletConnected();
    let wavePortalContract;
    const onNewWave = (from, timestamp, message) => {
      console.log('new wave', from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ])
    }
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        My name is brian and I'm a defi degen + full stack dev! <br/> Connect your Ethereum wallet and wave at me!
        </div>
        <div id="inputMsg">
          <input placeholder="Your wave message here..."></input>
        </div>
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        <h2>On-chain Transaction History</h2>
        {allWaves.map((wave, index) => {
          return (
            <div key={index} style ={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px"}}>
              <div> <b>Address: </b>{wave.address}</div>
              <div> <b>Time: </b> {wave.timestamp.toString()}</div>
              <div><b> Message: </b>{wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  )
}


const main = async () => {
  //declare state of wallet addys
  const [owner, randomPerson] = await hre.ethers.getSigners();
  //deploying contracts
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  
  //log after deploy successful
  console.log("Wave contract deployed to: ", waveContract.address);
  console.log("Wave contract deployed by: ", owner.address);

  //declare var, log total waves
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  //call increment fx
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();
  // let getUser = await waveContract.push(msg.sender);
  // await getUsers.wait();

  //log total waves + connect new wallet addy + increment 
  waveCount = await waveContract.getTotalWaves();
  waveCount = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait()
  
  //log total waves again
  waveCount = await waveContract.getTotalWaves(); 
  // waveCount = await waveContract.getUsers();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
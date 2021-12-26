
const main = async () => {
  //declare state of wallet addys
  const [owner, randomPerson] = await hre.ethers.getSigners();
  //deploying contracts
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  //deploy and fund contract w 0.1 eth
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();
  
  //log after deploy successful
  console.log("Wave contract deployed to: ", waveContract.address);
  console.log("Wave contract deployed by: ", owner.address);

  //get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  //call increment fx
  let waveTxn = await waveContract.wave('test msg');
  await waveTxn.wait();

  //see if contract balance decremented
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:', hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
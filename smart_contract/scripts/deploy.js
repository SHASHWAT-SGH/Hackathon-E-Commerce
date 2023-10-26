// const hre = require("hardhat");

const main = async () => {
  const transactions = await hre.ethers.deployContract("Transactions");
  // const transactions = await Transactions.deploy();
  await transactions.waitForDeployment();

  console.log("Transaction deployed to : ", transactions.target);
};

// run the main function and catch errors
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0xf372b7A2366beD79ffE7D605E6fd0557C616F05a

// npx hardhat run scripts/deploy.js --network sepolia

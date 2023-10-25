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

// 0x9627df2a09BCb55Be2134321191E41db8293D057

const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transaction = await Transactions.deploy();
  await transaction.deploy();

  console.log("Transaction deployed to : ", transaction.address);
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

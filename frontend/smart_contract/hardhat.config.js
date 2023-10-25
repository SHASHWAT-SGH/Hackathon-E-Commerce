require("@nomicfoundation/hardhat-toolbox");

// // https://eth-sepolia.g.alchemy.com/v2/MK1D5mtu6Tt-mMd9kodtKBL8xaXeBBhy

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
// };

// require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  networks: {
    repstoken: {
      url: "https://eth-sepolia.g.alchemy.com/v2/MK1D5mtu6Tt-mMd9kodtKBL8xaXeBBhy",
      accounts: [
        "f7e6a086cd7b67a7636206b768d9e69c392c950f5940b71ca7889047df2e2e81",
      ],
    },
  },
};

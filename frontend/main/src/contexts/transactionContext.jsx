import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../App";

export const TransactionContext = createContext();

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log(transactionContract);
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentMetaAccount, setCurrentMetaAccount] = useState();

  const [transactionFromData, setTransactionFromData] = useState({
    addressTo: "0x51de4F98E592748C9b80ea728Ce0e456934acE74",
    amount: 0,
    keyword: "",
    message: "",
  });

  const setMetaIdToDb = async () => {
    await axios
      .post("", {
        withCredentials: true,
      })
      .then(() => {});
  };

  // NOTE: the name of input fields should match the useState default value keys
  const handleTransactionFormDataChange = (e) => {
    setTransactionFromData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isMetamaskConnected = async () => {
    if (!window.ethereum) {
      alert("Please connect metamask");
      navigate("/");
    }
    const connectedMetaAccounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    console.log("connected meta accounts array", connectedMetaAccounts);
    if (connectedMetaAccounts.length) {
      setCurrentMetaAccount(connectedMetaAccounts[0]);
    } else {
      alert("Please connect metamask");
      navigate("/");
    }
  };

  const connectToWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please connect metamask");
      const metaAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentMetaAccount(metaAccounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) return alert("Please connect metamask");

      const { addressTo, amount, keyword, message } = transactionFromData;
      const transactionContract = await getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount.toString());

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentMetaAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      const receipt = transactionHash.wait();
      console.log("receipt", receipt);
      console.log(`Loading - ${transactionHash.hash}`);
      console.log(`Success - ${transactionHash.hash}`);
      alert("Purchase Successfull!");
      navigate("/");
    } catch (err) {
      console.log("add to blockchain error", err);
    }
  };

  const getTransaction = async () => {
    if (!window.ethereum) return alert("Please connect metamask");
    const transactionContract = await getEthereumContract();
    const transactions = await transactionContract.getAllTransactions();
    console.log("transactions", transactions);
  };

  return (
    <TransactionContext.Provider
      value={{
        connectToWallet,
        currentMetaAccount,
        transactionFromData,
        handleTransactionFormDataChange,
        sendTransaction,
        getTransaction,
        isMetamaskConnected,
        setTransactionFromData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

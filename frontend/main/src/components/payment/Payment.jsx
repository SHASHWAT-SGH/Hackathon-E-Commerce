import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/transactionContext";

function Payment() {
  const {
    connectToWallet,
    currentMetaAccount,
    transactionFromData,
    handleTransactionFormDataChange,
    sendTransaction,
    getTransaction,
  } = useContext(TransactionContext);

  const handleSubmit = () => {
    getTransaction();
    // const { addressTo, amount, keyword, message } = transactionFromData;
    // console.log(transactionFromData);
    // sendTransaction();
  };

  return (
    <div style={{ marginTop: "10rem", color: "white" }}>
      <div>
        <form>
          <input
            name="addressTo"
            placeholder="addressTo"
            onChange={handleTransactionFormDataChange}
          />
          <input
            name="amount"
            placeholder="amount"
            type="number"
            onChange={handleTransactionFormDataChange}
          />
          <input
            name="keyword"
            placeholder="keyword"
            onChange={handleTransactionFormDataChange}
          />
          <input
            name="message"
            placeholder="message"
            onChange={handleTransactionFormDataChange}
          />
          <button type="button" onClick={handleSubmit}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;

import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import illustrative from "../../assets/lottie/illustrativeAnimation.json";
import ethereumLogo from "../../assets/lottie/ethereumLogo.json";
import "./PaymentsPage.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { TransactionContext } from "../../contexts/transactionContext";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../App";
import { toast } from "react-toastify";

function PaymentsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const {
    connectToWallet,
    currentMetaAccount,
    transactionFromData,
    handleTransactionFormDataChange,
    sendTransaction,
    getTransaction,
    isMetamaskConnected,
    setTransactionFromData,
  } = useContext(TransactionContext);

  // const { isAuth } = useContext(productsContext);

  const handleSubmit = () => {
    setTransactionFromData((prev) => ({
      ...prev,
      amount: data.price * 0.0000065,
    }));
    // getTransaction();
    // const { addressTo, amount, keyword, message } = transactionFromData;
    console.log(transactionFromData);
    sendTransaction();
  };

  const shorthandMetaId = () => {
    return (
      currentMetaAccount.substring(0, 5) +
      "..." +
      currentMetaAccount.substring(
        currentMetaAccount.length - 8,
        currentMetaAccount.length
      )
    );
  };

  const getData = async () => {
    const productId = params.query;
    setLoading(true);
    try {
      const res = await axios.get(
        apiURL + "/api/productdetails?pid=" + productId,
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.data);
        setLoading(false);
        console.log("pic:", data);
      } else {
        toast.error(`No data found for this product`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const [userInfo, setUserInfo] = useState();
  const getUserInfo = async () => {
    await axios
      .get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
      .then((res) => setUserInfo(res.data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    isMetamaskConnected();
    getUserInfo();

    getData();
    data && console.log(data);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "transparent",
        width: "100%",
        marginTop: 75,
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#13111c",
          borderRadius: "2rem",
          margin: "1rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            justifyContent: "flex-start",
            fontWeight: "600",
          }}
        >
          Make Payment
        </div>
        <div className="ethereum-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Lottie
                style={{ width: "40%" }}
                animationData={ethereumLogo}
                loop={true}
              />
            </div>
            <div>
              <InfoCircleOutlined />
            </div>
          </div>
          <div>
            <div>
              {currentMetaAccount ? shorthandMetaId() : "Connect MetaMask!"}
            </div>
            <div>Ethereum</div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <form className="payment-inputs-container">
            <input
              name="addressFrom"
              placeholder="addressFrom"
              // onChange={handleTransactionFormDataChange}
              value={currentMetaAccount}
            />
            <input
              name="addressTo"
              placeholder="addressTo"
              onChange={handleTransactionFormDataChange}
              value={transactionFromData.addressTo}
            />
            <div style={{ display: "flex" }}>
              <div>Total Payable Amount :</div>
              <div style={{ marginLeft: "1rem" }}>
                {data.price * 0.0000065}{" "}
                <span style={{ fontWeight: "bolder" }}>ETH</span>
              </div>
            </div>
            <button
              className="payment-submit-btn"
              type="button"
              onClick={handleSubmit}
            >
              Make Payment
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Lottie
          style={{ width: "100%" }}
          animationData={illustrative}
          loop={true}
        />
      </div>
    </div>
  );
}

export default PaymentsPage;

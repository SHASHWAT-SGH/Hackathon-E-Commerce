import React, { createContext, useState } from "react";

export const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lModal, setLModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <productsContext.Provider
      value={{
        productData,
        setProductData,
        category,
        setCategory,
        selectedCategory,
        setSelectedCategory,
        isAuth,
        setIsAuth,
        lModal,
        setLModal,
        cartData,
        setCartData,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

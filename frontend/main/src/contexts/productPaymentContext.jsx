import React, { createContext, useState } from "react";

export const productPaymentContext = createContext();

export const productPaymentContextProvider = ({ children }) => {
  return (
    <productPaymentContext.Provider value={{}}>
      {children}
    </productPaymentContext.Provider>
  );
};

import React, { useState, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();
const defaultState = {
  isLoading: true,
  isError: false,
  cart: [],
  total: 0,
  amount: 0,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // const fetchData = async () => {
  //   dispatch({ type: "LOADING" });
  //   const response = await fetch(url);
  //   const cart = await response.json();
  //   dispatch({ type: "DISPLAY_ITEM", payload: cart });
  // };

  const getData = async () => {
    try {
      const response = await fetch(url);
      const resJSON = await response.json();
      dispatch({ type: "SET_CART", payload: resJSON });
      return resJSON;
    } catch (err) {
      dispatch({ type: "SET_ERROR" });
      console.log(err);
    }
  };
  let newCart = [];

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

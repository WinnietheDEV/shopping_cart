import React from "react";
import { useGlobalContext } from "./context";

// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
// items

function App() {
  const data = useGlobalContext();
  const { isLoading, isError, cart } = data.state;

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  } else if (isError) {
    return (
      <div className="loading">
        <h1>Error...</h1>
        <h1>please try again</h1>
      </div>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;

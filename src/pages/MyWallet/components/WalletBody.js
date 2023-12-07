import "./WalletBody.css";
import React, { useState, useEffect } from "react";

function WalletBody({id}) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`http://localhost:8080/gobooking/appuser/${id}`);   
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  const handleLoadMoney = async () => {
    try {
      const response = await fetch(`http://localhost:8080/gobooking/appuser/add_to_balance/${id}?balance=${amount}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchBalance();
        setAmount(0);
      }
    } catch (error) {
      console.log("Error loading money:", error);
    }
  };

  return (
    <div className="WalletBody">
      <h1>Load money and enjoy your bookings</h1>
      <div className="balance-container">
        <h2>My Balance:</h2>
        <p className="balance-value">&#8378;{balance}</p>
      </div>
      <div className="load-money-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleLoadMoney} className={"button-wallet"}>Load Money</button>
      </div>
    </div>
  );
}
export default WalletBody;

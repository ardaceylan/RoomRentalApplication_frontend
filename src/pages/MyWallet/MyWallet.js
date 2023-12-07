import "./MyWallet.css";
import React from "react";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";
import WalletBody from "./components/WalletBody";

import { useParams } from "react-router-dom";

function MyWallet() {
  const { id } = useParams();
  return (
    <div className="MyWallet">
      <Navbar id={id}/>      
      <WalletBody id={id}/>
      <Footer/>
    </div>
  );
}
export default MyWallet;

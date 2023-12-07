import "./Home.css";
import React from "react";
import Footer from "../../common_components/Footer";
import Navbar from "./components/Navbar";
import PlaceListHome from "./components/PlaceListHome";

function Home() {
  return (
    <div className="Home">
      <Navbar/>      
      <PlaceListHome heading="Places"/>
      <Footer/>
    </div>
  );
}
export default Home;

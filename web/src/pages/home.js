import React from "react";
import { getAuthToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/sidebar";
import HomeHeroSection from "../components/HomeHeroSection";
import Header from "../components/header";

const Home = (props) => {
  const userToken = getAuthToken();
  const decode = jwtDecode(userToken)

  return (
    <React.Fragment>
      <Sidebar />
      <Header />
      <div style={{ marginLeft: '350px', width: '70%' }}>
        <HomeHeroSection />
      </div>
    </React.Fragment>
  );
};

export default Home;

import React from "react";
import { Filter } from "./index";
import { Outlet, useLocation } from "react-router-dom";
import { Nav, Header, Footer } from "./index";
import { Intro, Contact } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";
const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return (
    <div>
      <Header />
      <Nav />
      <div className="lg:w-[65rem] w-full mx-auto my-10">
        {isLoggedIn &&
          location.pathname !== `/${path.CONTACT}` &&
          !location.pathname?.includes(path.DETAIL_POST) && <Filter />}
        <div className="w-full mt-6 flex items-center justify-center">
          <Outlet />
        </div>
        <Intro />
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default Home;

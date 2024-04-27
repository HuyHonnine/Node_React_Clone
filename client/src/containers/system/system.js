import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, SideBar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-row mt-[2%]">
        <div className="w-[15%]">
          <div className=" fixed w-[15%] h-full">
            <SideBar />
          </div>
        </div>
        <div className="w-[85%] mx-auto my-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;

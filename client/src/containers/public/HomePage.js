import React from "react";
import { text } from "../../ultils/constant";
import { Province } from "../../components";
import { List, Pagination, SideBar } from "./index";
import { Intro, Contact } from "../../components/index";

const HomePage = () => {
  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="font-bold lg:text-2xl sm:text-xl">{text.HOME_TITLE}</h1>
        <p className="text-gray-400 lg:text-[.75rem] sm:text-[1rem] font-semibold">
          {text.HOME_DESCRIPTION}
        </p>
      </div>
      <Province />
      <div className="flex gap-2 mt-6">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] space-y-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

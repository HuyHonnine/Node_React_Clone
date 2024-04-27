import React, { useEffect, useState } from "react";
import { Province } from "../../components";
import { List, Pagination, SideBar } from "./index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVNToString } from "../../ultils/constant";

const Rental = () => {
  const { categories } = useSelector((state) => state.app);
  const [categoryCode, setCategoryCode] = useState(null);
  const [categoryName, setCategoryName] = useState({
    header: "",
    subtitle: "",
  });
  const location = useLocation();

  useEffect(() => {
    const category = categories?.find(
      (item) => `/${formatVNToString(item.value)}` === location.pathname
    );
    if (category) {
      setCategoryName(category);
      setCategoryCode(category.code);
    }
  }, [categories, location]);

  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="font-bold lg:text-2xl sm:text-xl">
          {categoryName?.header}
        </h1>
        <p className="text-gray-400 lg:text-[.75rem] sm:text-[1rem] font-semibold">
          {categoryName?.subtitle}
        </p>
      </div>
      <Province />
      <div className="flex gap-2 mt-6">
        <div className="w-[70%]">
          <List categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className="w-[30%] space-y-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Rental;

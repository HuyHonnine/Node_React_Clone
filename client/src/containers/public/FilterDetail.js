import React from "react";
import { List, Pagination, SideBar } from "./index";
import { Intro, Contact } from "../../components/index";
import { ItemSidebarCol, ItemSidebarPost } from "../../components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVNToString } from "../../ultils/constant";

const FilterDetail = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const location = useLocation();

  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="font-bold lg:text-2xl sm:text-xl">
          {location.state?.titleFilter || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-gray-400 lg:text-[.75rem] sm:text-[1rem] font-semibold">
          {`${
            location.state?.titleFilter || ""
          } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}
        </p>
      </div>
      <div className="flex gap-2 mt-6">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] space-y-2">
          <ItemSidebarCol
            content={prices}
            type="priceCode"
            title="Xem Theo Giá"
          />
          <ItemSidebarCol
            content={areas}
            type="areaCode"
            title="Xem Theo Diện Tích"
          />
          <ItemSidebarPost />
          <SideBar />
        </div>
      </div>
      <Intro />
      <Contact />
    </div>
  );
};

export default FilterDetail;

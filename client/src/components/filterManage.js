import React, { memo, useState } from "react";
import icon from "../ultils/icons";
const { FaChevronDown } = icon;

const FilterManage = ({ itemFilter, onClick }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item.name);
    onClick(item);
    setShowFilter(false);
  };
  const filteredItemFilter = itemFilter.filter(
    (item) => item.name !== selectedItem
  );

  return (
    <div className="relative">
      <div
        className="px-2 py-1 text-mdbase border-2 rounded-sm text-gray-500 hover:bg-[#ccc] hover:text-white cursor-pointer flex items-center gap-1"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <span>{selectedItem || "Tất cả các bài đăng"}</span>
        <span className="text-smbase">
          <FaChevronDown />
        </span>
      </div>
      {showFilter && (
        <div className="border-2 rounded-sm shadow-sm absolute bg-white top-7 w-full">
          {filteredItemFilter.map((item) => (
            <p
              onClick={() => handleItemClick(item)}
              key={item.value}
              className="font-semibold text-mdbase cursor-pointer p-2 hover:bg-divBackground hover:text-white z-10"
            >
              {item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(FilterManage);

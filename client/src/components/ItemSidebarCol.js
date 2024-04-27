import React, { memo } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { formatVNToString } from "../ultils/constant";
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";

const ItemSidebarCol = ({ title, content, type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handlePrices = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };
  return (
    <div className="p-4 bg-white border-2 rounded-xl shadow-xl leading-10">
      <h3 className="font-bold lg:text-[1rem]">{title}</h3>
      <ul className="grid sm:grid-cols-1 lg:grid-cols-2">
        {content?.length > 0 &&
          content.map((item) => (
            <li key={item.code} className="flex items-center text-[.75rem]">
              <span className="mr-2">
                <AiFillCaretRight />
              </span>
              <div
                to={formatVNToString(item.value)}
                onClick={() => {
                  handlePrices(item.code);
                }}
                className="hover:underline hover:text-divBackground cursor-pointer"
              >
                {item.value}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(ItemSidebarCol);

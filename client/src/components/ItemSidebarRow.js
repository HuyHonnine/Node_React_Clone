import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { formatVNToString } from "../ultils/constant";

const ItemSidebarRow = ({ title, content }) => {
  return (
    <div className="p-4 bg-white border-2 rounded-xl shadow-xl leading-10">
      <h3 className="font-bold lg:text-[1rem]">{title}</h3>
      <ul>
        {content?.length > 0 &&
          content.map((item) => (
            <li key={item.code} className="flex items-center text-[.75rem]">
              <span className="mr-2">
                <AiFillCaretRight />
              </span>
              <NavLink
                to={formatVNToString(item.value)}
                className="hover:underline hover:text-divBackground"
              >
                {item.value}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(ItemSidebarRow);

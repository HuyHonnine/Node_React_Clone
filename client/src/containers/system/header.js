import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { formatVNToString } from "../../ultils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.actionGetCategory());
  }, []);
  return (
    <div className="p-[.1rem] bg-[#055699] flex items-center shadow-xl">
      <Link style={{ flex: ".15" }} to={"/"}>
        <h1 className="text-white font-bold sm:text-lgbase lg:text-base ml-2">
          PhongTro123.com
        </h1>
      </Link>
      <div className="flex items-center flex-1">
        <div className="p-2 text-white text-xl lg:text-[.75rem] font-semibold hover:text-btnBackground">
          <NavLink to={"/"}>Trang Chủ</NavLink>
        </div>
        {categories?.length > 0 &&
          categories.map((item) => (
            <div
              key={item.code}
              className="p-2 text-white text-xl lg:text-[.75rem] font-semibold hover:text-btnBackground "
            >
              <NavLink to={`/${formatVNToString(item.value)}`}>
                {item.value}
              </NavLink>
            </div>
          ))}

        <NavLink />
      </div>
    </div>
  );
};

export default Header;

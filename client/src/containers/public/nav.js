import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatVNToString } from "../../ultils/constant";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";
const active = "w-full h-full p-[.9rem] bg-btnBackground transition-all";
const notActive = "p-3 transition-all";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { categories } = useSelector((state) => state.app);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`shadow-[20px_10px_20px_rgba(0,0,0,0.24)] transition-all bg-divBackground ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50" : ""
      }`}
    >
      <div className="lg:w-[64rem] mx-auto flex items-center">
        <div className="p-2 text-white text-xl lg:text-[.75rem] font-semibold hover:bg-btnBackground cursor-pointer">
          <NavLink
            className={({ isActive }) => (isActive ? active : notActive)}
            to={"/"}
          >
            Trang Chủ
          </NavLink>
        </div>
        {categories?.length > 0 &&
          categories.map((item) => (
            <div
              key={item.code}
              className="p-2 text-white text-xl lg:text-[.75rem] font-semibold hover:bg-btnBackground"
            >
              <NavLink
                className={({ isActive }) => (isActive ? active : notActive)}
                to={formatVNToString(item.value)}
              >
                {item.value}
              </NavLink>
            </div>
          ))}
        <div className="p-2 text-white text-xl lg:text-[.75rem] font-semibold hover:bg-btnBackground cursor-pointer">
          <NavLink
            className={({ isActive }) => (isActive ? active : notActive)}
            to={path.CONTACT}
          >
            Liên hệ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;

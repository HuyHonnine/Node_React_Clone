import React from "react";
import { Button } from "../../components";
import defaut_avt from "../../assets/default-user.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { nav, support } from "../../ultils/constant";
import icon from "../../ultils/icons";

const { FiLogOut } = icon;

const activeNav =
  "flex items-center text-smbase lg:text-[.85rem] p-1 bg-gray-200 text-divBackground rounded-md";
const notActiveNav =
  "flex items-center text-smbase lg:text-[.85rem] p-1 hover:bg-gray-200 hover:text-divBackground rounded-md";

const SideBar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  if (!currentData || !currentData.id) {
    return null;
  }
  const idParts = currentData.id.split("-");
  const partialId = idParts[0];

  return (
    <div className="p-4 border-r-2 space-y-5 h-full shadow-lg bg-homeBackground">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={currentData.avatar || defaut_avt}
            alt="avatar"
          />
          <div className="flex flex-col">
            <p className="text-[1.25rem] lg:text-[1rem]">
              <span className="font-medium">{currentData.name}</span>
            </p>
            <p className="text-[1rem] lg:text-[.65rem]">{currentData.phone}</p>
          </div>
        </div>
        <p className="text-[1rem] lg:text-[.65rem]">
          Mã thành viên: <span className="font-bold">{partialId}</span>
        </p>
        <p className="text-[1rem] lg:text-[.65rem]">
          Tài Khoản Chính: <span className="font-bold">0 VNĐ</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          rounded="rounded-md"
          paddingX="px-4"
          paddingY="py-2"
          text="Nạp Tiền"
          textColor="text-white"
          bgColor="bg-divBackground"
          smSize="text-mdbase"
          lgSize="text-smbase"
        />
        <Button
          rounded="rounded-md"
          paddingX="px-4"
          paddingY="py-2"
          text="Đăng Tin"
          textColor="text-white"
          bgColor="bg-btnBackground"
          smSize="text-mdbase"
          lgSize="text-smbase"
          route="/he-thong/tao-moi-bai-dang"
        />
      </div>
      <div className="flex flex-col items-start bg-[#fff9e6] p-2 rounded-md">
        {support.length > 0 &&
          support.map((item) => {
            return (
              <span className="text-smbase lg:text-mdbase text-black font-medium">
                {item.title}
              </span>
            );
          })}
      </div>
      <div className="leading-8">
        {nav.map((item) => {
          return (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? activeNav : notActiveNav
              }
            >
              <span className="mr-1">
                <item.icon />
              </span>
              {item.title}
            </NavLink>
          );
        })}
        <NavLink
          onClick={() => {
            dispatch(actions.logout());
          }}
          className="flex items-center text-smbase lg:text-[.85rem] p-1 hover:bg-gray-200 hover:text-divBackground rounded-md"
        >
          <span className="mr-1">
            <FiLogOut />
          </span>
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;

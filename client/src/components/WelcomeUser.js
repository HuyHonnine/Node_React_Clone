import React, { memo } from "react";
import { useSelector } from "react-redux";
import defaut_avt from "../assets/default-user.png";
const WelcomeUser = () => {
  const { currentData } = useSelector((state) => state.user);
  if (!currentData || !currentData.id) {
    return null;
  }
  const idParts = currentData.id.split("-");
  const partialId = idParts[0];
  return (
    <div className="flex items-center gap-2">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={currentData?.avatar || defaut_avt}
        alt="avatar"
      />
      <div className="flex flex-col">
        <p className="text-[1.25rem] lg:text-[1rem]">
          Xin chào, <span className="font-bold">{currentData.name}</span> !
        </p>
        <p className="text-[1rem] lg:text-[.65rem]">
          Mã tài khoản: <span className="font-bold">{partialId}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(WelcomeUser);

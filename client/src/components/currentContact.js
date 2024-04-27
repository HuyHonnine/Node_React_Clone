import React from "react";
import { Button } from "./index";
import defaut_avt from "../assets/default-user.png";
import icons from "../ultils/icons";
const { FaPhoneAlt, SiZalo, FaHeart } = icons;
const CurrentContact = ({ name, phone, avatar }) => {
  return (
    <div className="p-2 bg-divBackground rounded-xl shadow-xl flex flex-col items-center justify-center gap-2">
      <img
        className="rounded-full w-[5rem] h-[5rem] object-cover"
        src={avatar || defaut_avt}
        alt="avatar"
      />
      <p className="text-mdbase italic text-white flex items-center justify-center gap-1">
        <p className="w-[.5rem] h-[.5rem] rounded-full bg-green-500"></p>
        Đang hoạt động
      </p>
      <p className="text-white font-semibold text-sm lg:text-base capitalize">
        {name}
      </p>
      <div className="w-full space-y-2">
        <Button
          text={phone}
          bgColor="bg-green-500"
          paddingX="px-3"
          paddingY="py-2"
          rounded="rounded-md"
          textColor="text-white"
          width="w-full"
          IcAfter={FaPhoneAlt}
        />
        <Button
          text="Nhắn Zalo"
          bgColor="bg-white"
          paddingX="px-3"
          paddingY="py-2"
          rounded="rounded-md"
          textColor="text-divBackground"
          width="w-full"
          IcAfter={SiZalo}
        />
        <Button
          text="Yêu Thích"
          bgColor="bg-white"
          paddingX="px-3"
          paddingY="py-2"
          rounded="rounded-md"
          textColor="text-divBackground"
          width="w-full"
          IcAfter={FaHeart}
        />
      </div>
    </div>
  );
};

export default CurrentContact;

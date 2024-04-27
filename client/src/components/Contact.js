import React, { memo } from "react";
import { contact } from "../ultils/constant";
import image1 from "../assets/support-bg.jpg";
import Button from "./Button";
const Contact = () => {
  return (
    <div className="bg-white px-20 py-8 rounded-xl text-center space-y-4 shadow-xl mt-8 flex items-center flex-col ">
      <img className="w-[25rem] h-full object-cover " src={image1} />
      <p className="font-bold">{contact.title}</p>
      <div className="flex items-center justify-between gap-20">
        {contact.helps.length > 0 &&
          contact.helps.map((item, index) => {
            return (
              <div key={index}>
                <p className="font-bold text-btnBackground">{item.name}</p>
                <p className="text-mdbase font-bold">
                  Điện thoại: {item.phone}
                </p>
                <p className="text-mdbase font-bold">Zalo: {item.zalo}</p>
              </div>
            );
          })}
      </div>
      <Button
        paddingX='px-6'
        paddingY='py-2'
        text="Gửi liên hệ ngay"
        textColor="text-white"
        bgColor="bg-divBackground"
      />
    </div>
  );
};

export default memo(Contact);

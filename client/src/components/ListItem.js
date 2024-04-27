import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../ultils/icons";
import { differenceInMilliseconds } from "date-fns";
import { formatVNToString } from "../ultils/constant";
import defaut_avt from "../assets/default-user.png";
import { path } from "../ultils/constant";
const { FaStar, FaRegHeart, FaHeart } = icons;

const ListItem = ({
  id,
  images,
  user: itemUser,
  title,
  star,
  description,
  address,
  attributes,
  createdAt,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

  const handleMouseEnter = () => {
    setIsHoverHeart(true);
  };

  const handleMouseLeave = () => {
    setIsHoverHeart(false);
  };

  const indexImages = [0, 1, 2, 3];
  // Tính thời gian từ createdAt đến hiện tại
  const diffInMs = differenceInMilliseconds(new Date(), new Date(createdAt));

  // Hàm chuyển đổi thời gian thành ngày, giờ và phút
  const formatTime = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} ngày`;
    } else if (hours > 0) {
      return `${hours} giờ`;
    } else {
      return `${minutes} phút`;
    }
  };

  const handleStar = (star) => {
    let starts = [];
    for (let i = 1; i <= +star; i++) {
      starts.push(
        <FaStar className="text-orange-400 lg:text-mdbase text-base inline-block mr-1" />
      );
    }
    return starts;
  };

  return (
    <div className="space-y-4">
      <div className="border-t border-gray-500 flex">
        <Link
          to={`${path.DETAIL_POST}${formatVNToString(title)}/${id}`}
          className="relative w-[30%]"
        >
          <div className="w-full grid grid-cols-2 gap-1">
            {images.length > 1 &&
              images
                .filter((i, index) => indexImages.some((i) => i === index))
                ?.map((i, index) => {
                  return (
                    <img
                      key={index}
                      className="w-full h-[7rem] object-cover"
                      src={i}
                      alt="preview"
                    />
                  );
                })}
          </div>
          <span className="p-1 bg-overlay-30 text-white rounded-md text-mdbase absolute font-bold left-2 bottom-2">
            {`${images.length} ảnh`}
          </span>
          <span
            className="absolute right-2 bottom-2 text-white text-xl cursor-pointer font-bold transition-all"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHoverHeart ? <FaHeart color="red" /> : <FaRegHeart />}
          </span>
        </Link>
        <div className="p-2 space-y-4 w-[70%]">
          <div className="flex items-start ">
            <Link
              to={`${path.DETAIL_POST}${formatVNToString(title)}/${id}`}
              className="lg:text-[.8rem] sm:text-base font-bold hover:text-blue-500 hover:underline cursor-pointer "
            >
              {handleStar(+star).length > 0 &&
                handleStar(+star).map((star, number) => {
                  return <span key={number}>{star}</span>;
                })}
              {title}
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="font-bold text-green-500 lg:text-base sm:text-[1.25rem]">
                {attributes?.price}
              </span>
              <span className="text-mdbase">{attributes?.acreage}</span>
              <span className="text-mdbase">{`${
                address.split(",")[address.split(",").length - 2]
              }${address.split(",")[address.split(",").length - 1]}`}</span>
            </div>
            <span className="text-gray-400 text-mdbase font-bold">
              {`${formatTime(diffInMs)} trước`}
            </span>
          </div>
          <p className="text-mdbase w-full h-[55px] text-ellipsis overflow-hidden">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {itemUser && (
                <Link>
                  <img
                    className="w-[1.5rem] h-[1.5rem] rounded-full object-cover mr-1"
                    src={itemUser.avatar || defaut_avt}
                    alt="user"
                  />
                </Link>
              )}
              {itemUser && (
                <Link>
                  <p className="lg:text-mdbase font-bold text-gray-500 hover:text-divBackground">
                    {itemUser.name}
                  </p>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2">
              {itemUser && (
                <Link>
                  <div className="bg-divBackground py-[1px] px-2 rounded-md text-white hover:underline lg:text-mdbase sm:text-xl">
                    {itemUser.phone}
                  </div>
                </Link>
              )}
              <Link>
                <p className="border border-divBackground py-[1px] px-2 rounded-md text-divBackground lg:text-mdbase sm:text-xl hover:underline hover:bg-divBackground hover:text-white ">
                  Nhắn Zalo
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

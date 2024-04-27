import React, { memo } from "react";
import { Link } from "react-router-dom";
import { differenceInMilliseconds } from "date-fns";
const itemNew = ({ title, price, createdAt, images }) => {
  const diffInMs = differenceInMilliseconds(new Date(), new Date(createdAt));
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
  const indexImages = [2];

  return (
    <div className="space-y-2">
      <div className="bg-white flex items-center gap-2 py-1 border-b-2">
        <Link>
          {images.length > 4 &&
            images
              .filter((i, index) => indexImages.some((i) => i === index))
              ?.map((i, index) => {
                return (
                  <img
                    key={index}
                    className="w-[5rem] h-[4rem] object-cover rounded-md"
                    src={i}
                    alt="preview"
                  />
                );
              })}
        </Link>
        <div className="space-y-2">
          <Link>
            <p className="lg:text-mdbase text-base font-bold text-divBackground hover:text-btnBackground hover:underline">
              {`${title?.slice(0, 40)}...`}
            </p>
          </Link>

          <div className="flex items-center justify-between">
            <span className="lg:text-[.85rem] text-base font-bold text-green-500">
              {price}
            </span>
            <span className="lg:text-mdbase text-base font-bold text-gray-500">
              {`${formatTime(diffInMs)} trước`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(itemNew);

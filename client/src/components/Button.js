import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  text,
  textColor,
  bgColor,
  IcAfter,
  route,
  onClick,
  width,
  paddingX,
  paddingY,
  rounded,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route); // Chuyển hướng đến route nếu có
    } else if (onClick) {
      onClick(); // Thực hiện hành động được chỉ định trong onClick nếu có
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`${textColor} ${bgColor} ${width} flex flex-row-reverse items-center justify-center gap-1 ${rounded} ${paddingX} ${paddingY} text-smbase lg:text-mdbase font-medium hover:bg-blueBackground transition-all hover:underline hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)]`}
        onClick={handleClick}
      >
        <span>{text}</span>
        {IcAfter && (
          <span className="text-sm">
            <IcAfter />
          </span>
        )}
      </button>
    </div>
  );
};

export default memo(Button);

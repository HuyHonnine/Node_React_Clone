import React, { memo } from "react";
const FilterItem = ({ text, iconStart, iconEnd }) => {
  return (
    <div>
      <button
        type="button"
        className="bg-white py-1 px-3 flex items-center justify-between rounded-md gap-4 w-[12rem]"
      >
        <span className="flex items-center lg:text-[.75rem] sm:text-xl gap-1">
          {iconStart}
          <p className="font-bold">{text}</p>
        </span>
        <span className="lg:text-[.75rem] sm:text-xl">{iconEnd}</span>
      </button>
    </div>
  );
};

export default memo(FilterItem);

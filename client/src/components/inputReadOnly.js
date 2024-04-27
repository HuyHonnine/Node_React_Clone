import React, { memo } from "react";

const InputReadOnly = ({ value, label, id, direction, change }) => {
  return (
    <div className={`w-1/2 ${direction ? "flex items-center" : "space-y-2"}`}>
      <label htmlFor={id} className="font-medium w-[30%]">
        {label}
      </label>
      <div className="w-full">
        <input
          id={id}
          readOnly
          value={value || ""}
          className="outline-none px-2 py-1 w-full rounded-md border-2 bg-gray-300"
        />
        {change && (
          <small className="text-mdbase lg:text-sm text-divBackground cursor-pointer font-semibold hover:underline transition-all">
            {change}
          </small>
        )}
      </div>
    </div>
  );
};

export default memo(InputReadOnly);

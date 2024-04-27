import React, { memo } from "react";
import { formatPriceDisplay } from "../ultils/constant";
const InputV2 = ({
  label,
  id,
  width,
  unit,
  value,
  setValue,
  name,
  small,
  type,
  check,
  invalidFields,
  setInvalidFields,
  direction,
}) => {
  const handleChange = (e) => {
    let value = e.target.value;
    if (check === "number") {
      value = value.replace(/\D/g, "");
    } else if (check === "text") {
      value = value.replace(
        /[^a-zA-ZÀ-Ỹà-ỹ0-9\s!@#$%^&*()_+\-={}[\]:;"'<>,.?/]/g,
        ""
      );
    }
    // if (type === "yes") {
    //   value = value.replace(/\./g, "");
    //   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div
        className={` ${width} ${direction ? "flex items-center" : "space-y-2"}`}
      >
        <label htmlFor={id} className="font-medium w-[30%]">
          {label}
        </label>
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center flex-col relative">
            <input
              type="text"
              className="outline-none px-2 py-1 w-full rounded-md border-2"
              value={value}
              onFocus={() => setInvalidFields([])}
              onChange={handleChange}
            />
            {unit && (
              <span className="px-2 py-1 absolute bg-gray-300 right-0 rounded-tr-md rounded-br-md">
                {unit}
              </span>
            )}
          </div>

          {invalidFields?.some((i) => i.name === name) && (
            <small className="text-red-500 italic lg:text-sm text-base">
              {invalidFields?.find((i) => i.name === name)?.message}
            </small>
          )}
        </div>
      </div>

      {type && (
        <div className="flex flex-col gap-2">
          {type === "yes" && (
            <span className="text-btnBackground italic">
              {formatPriceDisplay(value.toString())}
            </span>
          )}
          {small && <small className="opacity-70">{small}</small>}
        </div>
      )}
    </>
  );
};

export default memo(InputV2);

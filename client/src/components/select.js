import React, { memo } from "react";

const Select = ({
  label,
  option,
  value,
  setValue,
  type,
  reset,
  width,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find((item) => item.name === name);
    let addressInvalid = invalidFields?.find((item) => item.name === "address");
    return (
      `${nameInvalid ? nameInvalid.message : ""}` ||
      `${addressInvalid ? addressInvalid.message : ""}`
    );
  };
  return (
    <div className={`flex flex-col gap-2 flex-1 ${width} `}>
      <label htmlFor="select-address" className="font-medium">
        {label}
      </label>
      <select
        value={reset ? "" : value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
        id="select-address"
        className="outline-none px-2 py-1 w-full rounded-md border-2 cursor-pointer"
        multiple={false}
      >
        <option value="">--Chọn--</option>
        {option.map((item) => (
          <option
            key={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item?.code
            }
            value={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item.code
            }
          >
            {type === "province"
              ? item?.province_name
              : type === "district"
              ? item?.district_name
              : item.value}
          </option>
        ))}
      </select>
      {invalidFields && (
        <small className="text-red-500 italic lg:text-sm text-base">
          {handleErrorText()}
        </small>
      )}
    </div>
  );
};

export default memo(Select);

import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Select, InputV2, InputReadOnly } from "./index";

const OverView = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { currentData } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.app);
  const { dataEdit } = useSelector((state) => state.post);

  const target = [
    { code: "Tất cả", value: "Tất cả" },
    { code: "Nam", value: "Nam" },
    { code: "Nữ", value: "Nữ" },
  ];
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
    }));
  }, [currentData, categories]);
  return (
    <div className="space-y-4">
      <h2 className="text-base lg:text-xl font-medium">Thông tin mô tả</h2>
      <div className="space-y-2">
        <Select
          name="categoryCode"
          setValue={setPayload}
          value={payload.categoryCode}
          width="w-1/2"
          option={categories}
          label="Loại chuyên mục"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputV2
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.title}
          setValue={setPayload}
          name="title"
          label="Tiêu Đề"
          id="title"
          width="w-full"
          check="text"
        />
        <div className="space-y-2">
          <label htmlFor="desc" className="font-medium">
            Nội dung mô tả
          </label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            className="outline-none p-2 w-full rounded-md border-2"
            onFocus={() => setInvalidFields([])}
          />
          <small className="text-red-500 italic lg:text-sm text-base">
            {invalidFields?.some((i) => i.name === "description") &&
              invalidFields?.find((i) => i.name === "description")?.message}
          </small>
        </div>
        <InputReadOnly
          id="name"
          label="Thông tin liên hệ"
          value={currentData.name}
        />
        <InputReadOnly
          id="phone"
          label="Điện thoại"
          value={currentData.phone}
        />
        <InputV2
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          id="price"
          check="number"
          type="yes"
          label="Giá cho thuê"
          width="w-1/2"
          unit="đồng/tháng"
          small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
          name="priceNumber"
          value={payload.priceNumber}
          setValue={setPayload}
        />
        <InputV2
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          id="area"
          check="number"
          value={payload.areaNumber}
          setValue={setPayload}
          name="areaNumber"
          label="Diện tích"
          width="w-1/2"
          unit="m2"
        />
        <Select
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          name="target"
          value={payload.target}
          setValue={setPayload}
          width="w-1/2"
          option={target}
          label="Đối tượng cho thuê"
        />
      </div>
    </div>
  );
};

export default memo(OverView);

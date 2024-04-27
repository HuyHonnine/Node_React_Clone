import React, { useEffect, memo } from "react";
import { InputFile } from "./index";
import img from "../assets/upload-image.png";
const UploadFile = ({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
}) => {
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
    }));
  }, []);
  return (
    <div>
      <div className="space-y-4 w-full">
        <h2 className="text-base lg:text-xl font-medium">Hình ảnh</h2>
        <InputFile
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          title="Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn"
          img={img}
          setValue={setPayload}
          value={payload}
          wImg="w-[7rem]"
          hImg="h-[5.5rem]"
          subimg="Thêm ảnh"
        />
      </div>
    </div>
  );
};

export default memo(UploadFile);

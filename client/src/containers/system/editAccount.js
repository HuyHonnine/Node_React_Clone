import React, { useState } from "react";
import {
  Path,
  InputReadOnly,
  InputV2,
  Button,
  Loading,
} from "../../components";
import avatar from "../../assets/default-user.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUpLoadImage, apiUpdateCurrent } from "../../services";
import validate from "../../ultils/Common/validate";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: currentData?.avatar || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });
  const idParts = currentData?.id ? currentData.id.split("-") : [];
  const partialId = idParts.length > 0 ? idParts[0] : "";

  const handleUploadAvatar = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    const response = await apiUpLoadImage(formData);
    if (response.status === 200) {
      setPayload((prev) => ({
        ...prev,
        avatar: response?.data.secure_url,
      }));
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    const results = validate(payload, setInvalidFields);
    if (results === 0) {
      const response = await apiUpdateCurrent(payload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", "Cập nhật thành công!", "success").then(() => {
          dispatch(getCurrent());
        });
      } else Swal.fire("Thất bại!", "Cập nhật thất bại!", "error");
    }
  };
  return (
    <div className="px-8 py-4 space-y-4 bg-white w-full">
      <Path system title="Cập nhật thông tin cá nhân" />
      <div className="space-y-3 border-b-2 py-3">
        <h2 className="py-3 text-xl lg:text-2xl font-semibold">
          Cập nhật thông tin cá nhân
        </h2>
      </div>
      <div className="flex items-center flex-col justify-center gap-6">
        <InputReadOnly
          value={`#${partialId}`}
          direction
          label="Mã thành viên"
        />
        <InputReadOnly
          direction
          label="Số điện thoại"
          change="Đổi số điện thoại"
          value={currentData?.phone}
        />
        <InputV2
          name="name"
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          width="w-[50%]"
          label="Tên hiển thị"
          check="text"
          direction
          value={payload.name}
        />
        <InputV2
          name="zalo"
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          width="w-[50%]"
          label="Số Zalo"
          check="number"
          direction
          value={payload.zalo}
        />
        <InputV2
          name="fbUrl"
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          width="w-[50%]"
          label="Facebook"
          check="text"
          direction
          value={payload.fbUrl}
        />
        <div className="flex items-center w-[50%]">
          <label className="font-medium w-[30%] ">Mật khẩu</label>
          <small className="text-mdbase lg:text-sm text-divBackground cursor-pointer font-semibold hover:underline transition-all w-full">
            Đổi mật khẩu
          </small>
        </div>
        <div className="flex items-center w-[50%]">
          <label className="font-medium w-[30%]">Ảnh đại diện</label>
          <div className="w-full flex flex-col gap-2">
            {isLoading ? (
              <Loading />
            ) : (
              <img
                src={payload.avatar || avatar}
                alt="avatar"
                className="rounded-full w-[10rem] h-[10rem]"
              />
            )}
            <label
              htmlFor="avatarInput"
              className="w-[10rem] text-center text-smbase lg:text-mdbase font-medium hover:bg-blueBackground transition-all hover:underline hover:shadow-[5px_5px_5px_rgba(0,0,0,0.24)] cursor-pointer rounded-md px-4 py-2 bg-btnBackground text-white"
            >
              Chọn hình ảnh
            </label>
            <input
              id="avatarInput"
              onChange={handleUploadAvatar}
              type="file"
              className="hidden"
            />
            <small className="text-red-500 italic lg:text-sm text-base">
              {invalidFields?.some((i) => i.name === "avatar") &&
                invalidFields?.find((i) => i.name === "avatar")?.message}
            </small>
          </div>
        </div>
        <Button
          text="Lưu và cập nhật"
          textColor="text-white"
          bgColor="bg-divBackground"
          paddingX="lg:px-[25rem] px-[10rem]"
          paddingY="py-2"
          rounded="rounded-md"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditAccount;

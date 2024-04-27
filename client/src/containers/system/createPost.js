import React, { useState, useEffect } from "react";
import { Path } from "../../components";
import { UploadFile, Button, Address, OverView } from "../../components";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import { useSelector } from "react-redux";
import { apiCreatePost, apiUpdatePost } from "../../services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validate";
import * as actions from "../../store/actions";
const CreatePost = ({ dataEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!dataEdit) {
      dispatch(actions.resetDataEdit());
    }
  }, [dataEdit, dispatch]);

  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image ? JSON.parse(dataEdit.images.image) : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || "",
      label: dataEdit?.label || "",
      category: dataEdit?.category || "",
    };
    return initData;
  });

  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
      label: "",
      category: "",
    });
  };

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
      category: categories?.find((item) => item.code === payload?.categoryCode)
        ?.value,
    };
    const results = validate(finalPayload, setInvalidFields);
    if (results === 0) {
      if (dataEdit) {
        finalPayload.id = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        finalPayload.userId = dataEdit?.userId;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          navigate("/");
          Swal.fire("Thành công!", "Sửa bài đăng thành công!", "success").then(
            () => {
              resetPayload();
              dispatch(actions.resetDataEdit());
            }
          );
        } else Swal.fire("Thất bại!", "Sửa bài đăng thất bại!", "error");
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          navigate("/");
          Swal.fire(
            "Thành công!",
            "Đã đăng tin mới thành công!",
            "success"
          ).then(() => {
            resetPayload();
          });
        } else Swal.fire("Thất bại!", "Đăng tin thất bại!", "error");
      }
    }
  };
  return (
    <div className="px-8 py-4 space-y-4 bg-white">
      {!dataEdit ? <Path title="Đăng tin mới" system /> : ""}
      {!dataEdit ? (
        <h1 className="py-3 border-b-2 text-2xl lg:text-3xl font-semibold">
          Đăng tin mới
        </h1>
      ) : (
        ""
      )}

      {!dataEdit ? (
        <div className="py-2 px-3 bg-[#f8d7da] text-mdbase text-[#721c24] mt-3">
          Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng
          ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm
          mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ
          không được duyệt.
        </div>
      ) : (
        ""
      )}
      <div className="mt-4 flex">
        <div
          className={`${!dataEdit ? "w-[70%] space-y-8" : "w-full space-y-8"}`}
        >
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <OverView
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <UploadFile
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Button
            rounded="rounded-md"
            paddingX="px-6"
            paddingY="py-2"
            text={!dataEdit ? "Tạo mới" : "Cập nhật"}
            textColor="text-white"
            bgColor="bg-divBackground"
            width="w-full"
            onClick={handleSubmit}
          />
        </div>

        <div className={`${!dataEdit ? "w-[30%]" : "hidden"}`}>
          <div className="bg-[#fff3cd] text-[#856404] p-2 rounded-md w-full">
            <h3 className="text-sm lg:text-base font-medium">
              Lưu ý khi đăng tin
            </h3>
            <ul className="text-xs list leading-6	">
              <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
              <li>Tiêu đề tin không dài quá 100 kí tự</li>
              <li>
                Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                hiệu quả hơn.
              </li>
              <li>
                Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy
                sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới
                đúng vị trí của tin rao.
              </li>
              <li>
                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so
                với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh
                chóng!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

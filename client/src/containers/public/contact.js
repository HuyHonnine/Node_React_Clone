import React, { useState } from "react";
import { Path, InputV2, Button } from "../../components";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validate";
const Contact = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    content: "",
    phone: "",
  });
  const handleSubmit = () => {
    const results = validate(payload, setInvalidFields);
    if (results === 0) {
      Swal.fire(
        `Cảm ơn ${payload.name ? payload.name : ""}`,
        "Bạn đã gửi liên hệ thành công!",
        "success"
      ).then(() => {
        setPayload({
          name: "",
          content: "",
          phone: "",
        });
      });
    } else Swal.fire("Thất bại!", "Bạn đã gửi liên hệ thất bại!", "error");
  };
  return (
    <div className="w-full space-y-2">
      <Path title="Liên hệ" />
      <h2 className="py-3 text-xl  lg:text-2xl font-semibold">
        Liên hệ với chúng tôi
      </h2>
      <div className="flex gap-4 ">
        <div className="space-y-2 flex-1 h-fit rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 p-4 text-white">
          <h3 className="font-bold">Thông tin liên hệ</h3>
          <ul className="font-semibold">
            <li>
              Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã
              lựa chọn PhongTro123.Com
            </li>
            <li>Điện thoại: 0917 686 101</li>
            <li>Email: cskh.phongtro123@gmail.com</li>
            <li>Zalo: 0917 686 101</li>
            <li>Viber: 0917 686 101</li>
            <li>
              Địa chỉ: LD - 02.06, Toà nhà Lexington Residence, Số 67 Mai Chí
              Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
            </li>
          </ul>
        </div>
        <div className="space-y-2 flex-1 bg-white p-6 rounded-md">
          <h3 className="font-semibold text">Thông tin liên hệ</h3>
          <InputV2
            name="name"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            width="w-full"
            label="Họ tên"
            value={payload.name}
          />
          <InputV2
            name="phone"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            width="w-full"
            label="Số điện thoại"
            check="number"
            value={payload.phone}
          />
          <div className="space-y-2">
            <label htmlFor="desc" className="font-medium">
              Nội dung mô tả
            </label>
            <textarea
              id="desc"
              cols="30"
              rows="10"
              value={payload.content}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, content: e.target.value }))
              }
              className="outline-none p-2 w-full rounded-md border-2 "
              onFocus={() => setInvalidFields([])}
            />
            <small className="text-red-500 italic lg:text-sm text-base">
              {invalidFields?.some((i) => i.name === "content") &&
                invalidFields?.find((i) => i.name === "content")?.message}
            </small>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-divBackground"
              width="w-full"
              textColor="text-white"
              paddingX="px-3"
              paddingY="py-2"
              rounded="rounded-md"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components";
import IcAfter from "../../ultils/icons";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validate";
const { FaPhoneAlt, RiLockPasswordFill, FaUserAlt } = IcAfter;

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);

  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    msg && Swal.fire("Oops!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  return (
    <div className="p-4 space-y-4 shadow-md mt-4 bg-white rounded-xl lg:w-[600px]">
      <h2 className="text-center text-xl lg:text-2xl font-semibold">
        {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
      </h2>
      <div className="w-full space-y-7">
        {isRegister && (
          <Input
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Họ Và Tên"}
            IcAfter={FaUserAlt}
            value={payload.name}
            setValue={setPayload}
            keyPayload={"name"}
          />
        )}
        <Input
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Số Điện Thoại"}
          IcAfter={FaPhoneAlt}
          value={payload.phone}
          setValue={setPayload}
          keyPayload={"phone"}
        />
        <Input
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"Mật Khẩu"}
          IcAfter={RiLockPasswordFill}
          value={payload.password}
          setValue={setPayload}
          keyPayload={"password"}
          type="password"
        />
      </div>
      <Button
        rounded="rounded-md"
        paddingX="px-6"
        paddingY="py-2"
        onClick={handleSubmit}
        text={isRegister ? "Đăng kí" : "Đăng nhập"}
        width="w-full"
        textColor="text-white"
        bgColor="bg-divBackground"
      />
      {isRegister ? (
        <>
          <div className="flex flex-col">
            <small>
              Bạn đã có tài khoản?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:text-btnBackground transition-all hover:underline"
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Đăng Nhập Ngay
              </span>
            </small>
            <small>
              Khi bạn đồng ý đăng kí thì đã chập thuận quy định của chúng tôi
            </small>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <small className="text-blue-600 cursor-pointer hover:text-btnBackground transition-all  hover:underline">
              Bạn quên mật khẩu?
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-blue-600 cursor-pointer hover:text-btnBackground transition-all hover:underline"
            >
              Tạo tài khoản mới!
            </small>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

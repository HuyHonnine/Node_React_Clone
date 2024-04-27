import React, { useCallback, useRef, useEffect, useState } from "react";
import { WelcomeUser, Button } from "../../components";
import IcAfter from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import { menu } from "../../ultils/constant";
import logo from "../../assets/Logo.png";
import logout from "../../assets/dashboard-logout.png";
import * as actions from "../../store/actions";
const { FiPlusCircle, FaChevronDown } = IcAfter;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div
      ref={headerRef}
      className="lg:w-[64rem] w-full mx-auto flex items-center py-6 justify-between "
    >
      <Link to={"/"}>
        <img
          className="h-[2rem] w-full lg:h-full lg:w-[13rem] object-cover cursor-pointer"
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="flex gap-2 items-center">
        {!isLoggedIn && (
          <div className="flex gap-2 items-center">
            <p className="text-[1rem] lg:text-[.75rem]">
              <span className="font-bold">PhongTro123.com </span> xin chào!
            </p>
            <Button
              rounded="rounded-md"
              paddingX="px-6"
              paddingY="py-2"
              text={"Đăng Nhập"}
              textColor="text-white"
              bgColor="bg-btnBackground"
              lgSize="text-mdbase"
              onClick={() => goLogin(false)}
            />
            <Button
              rounded="rounded-md"
              paddingX="px-6"
              paddingY="py-2"
              text={"Đăng ký"}
              textColor="text-white"
              bgColor="bg-btnBackground"
              lgSize="text-mdbase"
              onClick={() => goLogin(true)}
            />
            <Button
              rounded="rounded-md"
              paddingX="px-6"
              paddingY="py-2"
              text={"Đăng Tin Mới"}
              textColor="text-white"
              bgColor="bg-divBackground"
              IcAfter={FiPlusCircle}
            />
          </div>
        )}
        {isLoggedIn && (
          <div className="flex gap-2 items-center">
            <WelcomeUser />
            <div className="relative">
              <Button
                rounded="rounded-md"
                paddingX="px-6"
                paddingY="py-2"
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-divBackground"
                IcAfter={FaChevronDown}
                onClick={() => {
                  setShowMenu((prev) => !prev);
                }}
              />
              {showMenu && (
                <div className="absolute flex flex-col gap-2 bg-white shadow-xl rounded-xl p-4 top-full righ-0 z-40 w-[100%] mt-2">
                  {menu.length > 0 &&
                    menu.map((item) => (
                      <Link
                        className="py-2 border-b text-mdbase flex items-center gap-1"
                        key={item.id}
                        to={item?.path}
                      >
                        <span className="w-[1rem] h-full object-cover">
                          <img src={item.img} alt={item.value} />
                        </span>
                        <span className="text-divBackground hover:text-btnBackground cursor-pointer">
                          {item.value}
                        </span>
                      </Link>
                    ))}
                  <Link className="py-2 border-b text-mdbase flex items-center gap-1">
                    <span className="w-[1rem] h-full object-cover">
                      <img src={logout} alt="Đăng xuất" />
                    </span>
                    <span
                      onClick={() => {
                        dispatch(actions.logout());
                        setShowMenu(false);
                      }}
                      className="text-divBackground hover:text-btnBackground cursor-pointer"
                    >
                      Đăng xuất
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <Button
              rounded="rounded-md"
              paddingX="px-6"
              paddingY="py-2"
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-btnBackground"
              IcAfter={FiPlusCircle}
              route="/he-thong/tao-moi-bai-dang"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

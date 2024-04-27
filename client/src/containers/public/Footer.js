import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import icons from "../../ultils/icons";

const {
  FaFacebook,
  FaInstagram,
  FaTwitch,
  FaSquareXTwitter,
  BsBank2,
  FaCcJcb,
  RiVisaLine,
  FaCcMastercard,
} = icons;

const about = [
  { name: "Trang chủ" },
  { name: "Giới thiệu" },
  { name: "Blog" },
  { name: "Quy chế hoạt động" },
  { name: "Quy định sử dụng" },
  { name: "Chính sách bảo mật" },
  { name: "Liên hệ" },
];
const hepls = [
  { name: "Câu hỏi thường gặp" },
  { name: "Hướng dẫn đăng tin" },
  { name: "Bảng giá dịch vụ" },
  { name: "Quy định đăng tin" },
  { name: "Giải quyết khiếu nại" },
];

const Footer = () => {
  return (
    <div className="bg-white w-full p-4">
      <div className="lg:w-[65rem] w-full mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-2">
          <Link to={"/"}>
            <img className="w-[13rem] h-[2rem] object-cover" src={logo} />
          </Link>
          <p className="text-mdbase ">
            Phongtro123.com tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh
            vực cho thuê phòng trọ.
          </p>
        </div>
        <div className="leading-8">
          <p className="font-bold">Về PHONGTRO123.COM</p>
          <ul>
            {about.length > 0 &&
              about.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-mdbase hover:text-divBackground hover:underline hover:ml-2 transition-all"
                  >
                    <Link>{item.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="leading-8">
          <p className="font-bold">Hỗ trợ khách hàng</p>
          <ul>
            {hepls.length > 0 &&
              hepls.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-mdbase hover:text-divBackground hover:underline hover:ml-2 transition-all"
                  >
                    <Link>{item.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <p>Liên hệ với chúng tôi</p>
            <div className="flex items-center gap-4 text-2xl">
              <Link className="hover:text-divBackground">
                <FaFacebook />
              </Link>
              <Link className="hover:text-pink-500">
                <FaInstagram />
              </Link>
              <Link className="hover:text-purple-500">
                <FaTwitch />
              </Link>
              <Link>
                <FaSquareXTwitter />
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <p>Phương thức thanh toán</p>
            <div className="flex items-center gap-4 text-2xl">
              <Link>
                <RiVisaLine />
              </Link>
              <Link>
                <FaCcMastercard />
              </Link>
              <Link>
                <BsBank2 />
              </Link>
              <Link>
                <FaCcJcb />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

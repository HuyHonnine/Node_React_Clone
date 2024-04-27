import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { ItemSidebarCol, ItemSidebarPost } from "../../components";
const listNew = [
  { title: "Quy trình đăng ký tạm trú cho người thuê phòng trọ mới nhất" },
  { title: "Thủ tục thuê phòng trọ chính xác dành cho người nước ngoài" },
  {
    title: "Cho thuê phòng trọ có cần đăng ký giấy phép kinh doanh hay không?",
  },
  { title: "Kinh doanh cho thuê phòng trọ cần đóng những loại thuế nào?" },
  {
    title:
      "Sinh viên Hà Nội nên ở trọ hay ký túc xá? Cần lưu ý điều gì khi thuê trọ?",
  },
  {
    title: 'Chia sẻ "mẹo" đăng tin cho thuê phòng trọ hiệu quả tại Phongtro123',
  },
];

const listTnterested = [
  { title: "Mẫu hợp đồng cho thuê phòng trọ" },
  { title: "Cẩn thận các kiểu lừa đảo khi thuê phòng trọ" },
  { title: "Kinh nghiệm thuê phòng trọ Sinh Viên" },
];

const SideBar = () => {
  const { prices, areas } = useSelector((state) => state.app);

  return (
    <div className="space-y-2">
      <ItemSidebarCol content={prices} type="priceCode" title="Xem Theo Giá" />
      <ItemSidebarCol
        content={areas}
        type="areaCode"
        title="Xem Theo Diện Tích"
      />
      <ItemSidebarPost />
      <div className="p-4 bg-white border-2 rounded-xl shadow-xl">
        <h3 className="font-bold lg:text-[1rem] mb-3">Bài viết mới</h3>
        <ul className="leading-6">
          {listNew?.length > 0 &&
            listNew.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-[.75rem] border-b-2 border-dotted"
              >
                <span className="mr-2">
                  <AiFillCaretRight />
                </span>
                <NavLink className="hover:underline hover:text-divBackground">
                  {item.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <div className="p-4 bg-white border-2 rounded-xl shadow-xl">
        <h3 className="font-bold lg:text-[1rem] mb-3">Có thể bạn quan tâm</h3>
        <ul className="leading-6">
          {listTnterested?.length > 0 &&
            listTnterested.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-[.75rem] border-b-2 border-dotted"
              >
                <span className="mr-2">
                  <AiFillCaretRight />
                </span>
                <NavLink className="hover:underline hover:text-divBackground">
                  {item.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

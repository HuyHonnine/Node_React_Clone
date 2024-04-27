import icon from "../ultils/icons";
import add from "../assets/dashboard-add-post.png";
import manage from "../assets/dashboard-manage-post.png";
import user from "../assets/dashboard-user.png";

export const path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  LOGIN: "login",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_CHO_THUE: "nha-cho-thue",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  DETAIL_POST: "/chi-tiet/",
  DETAL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  CONTACT: "lien-he",
  FILTER: "loc",
  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  POST_MANAGE: "quan-ly-bai-dang",
  EDIT_ACCOUNT: "cap-nhat-thong-tin-ca-nhan",
};

export const text = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý!",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const intro = {
  title: "Tại sao lại chọn PhongTro123.com?",
  description1:
    "Tại sao lại chọn PhongTro123.com? Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: ",
  description2:
    "Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
  statistic: [
    {
      name: "Thành viên",
      value: "116.998+",
    },
    {
      name: "Tin đăng",
      value: "103.348+",
    },
    {
      name: "Lượt truy cập/tháng",
      value: "300.000+",
    },
    {
      name: "Lượt xem/tháng",
      value: "2.500.000+",
    },
  ],
  subtitle: "Chi phí thấp, hiệu quả tối đa",
  comment:
    '"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."',
  user: "Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)",
  question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
  answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài",
};

export const contact = {
  title: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
  helps: [
    {
      name: "HỖ TRỢ ĐĂNG TIN:",
      phone: "0902657123",
      zalo: "0902657123",
    },
    {
      name: "HỖ TRỢ ĐĂNG TIN:",
      phone: "0901424123",
      zalo: "0901424123",
    },
    {
      name: "HỖ TRỢ ĐĂNG TIN:",
      phone: "0903007123",
      zalo: "0903007123",
    },
    {
      name: "PHẢN ÁNH/KHIẾU NẠI:",
      phone: "0917686101",
      zalo: "0917686101",
    },
  ],
};

export const locationCity = [
  {
    id: "hcm",
    title: "Phòng trọ Hồ Chí Minh",
    img: "https://phongtro123.com/images/location_hcm.jpg",
  },
  {
    id: "dn",
    title: "Phòng trọ Đà Nẵng",
    img: "https://phongtro123.com/images/location_dn.jpg",
  },
  {
    id: "hn",
    title: "Phòng trọ Hà Nội",
    img: "https://phongtro123.com/images/location_hn.jpg",
  },
];

export const menu = [
  {
    id: "1",
    value: "Đăng tin cho thuê",
    img: add,
    path: "/he-thong/tao-moi-bai-dang",
  },
  {
    id: "2",
    value: "Quản lý tin đăng",
    img: manage,
    path: "/he-thong/quan-ly-bai-dang",
  },
  {
    id: "3",
    value: "Thông tin cá nhân",
    img: user,
    path: "/he-thong/trang-ca-nhan",
  },
];

export const postMangeFilter = [
  {
    name: "Tất cả các bài đăng",
    value: 0,
  },
  {
    name: "Bài đăng đang hiển thị",
    value: 1,
  },
  {
    name: "Bài đăng hết hạn",
    value: 2,
  },
];

export const support = [
  {
    title: "Nhân viên hỗ trợ riêng của bạn:",
  },
  {
    title: "Tường Vy - LBKCorp",
  },
  {
    title: "0903007123",
  },
];

const {
  TbDiscount2,
  MdPostAdd,
  FaEdit,
  LiaDonateSolid,
  FaHistory,
  TbZoomMoney,
  MdOutlinePriceChange,
  TiMessages,
  FiLogOut,
} = icon;

export const nav = [
  {
    title: "Ưu đãi thành viên mới",
    path: "/khuyen-mai-dac-biet-cho-thanh-vien-moi",
    icon: TbDiscount2,
  },
  {
    title: "Quản lý bài đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: MdPostAdd,
  },
  {
    title: "Sửa thông tin cá nhân",
    path: "/he-thong/cap-nhat-thong-tin-ca-nhan",
    icon: FaEdit,
  },
  {
    title: "Nạp tiền vào tài khoản",
    path: "/he-thong/nap-tien",
    icon: LiaDonateSolid,
  },
  {
    title: "Lịch sử nạp tiền",
    path: "/he-thong/lich-su-nap-tien",
    icon: TbZoomMoney,
  },
  {
    title: "Lịch sử thanh toán",
    path: "/he-thong/lich-su-thanh-toan",
    icon: FaHistory,
  },

  {
    title: "Bảng giá dịch vụ",
    path: "/bang-gia-dich-vu",
    icon: MdOutlinePriceChange,
  },
  {
    title: "Liên hệ",
    path: "/lien-he",
    icon: TiMessages,
  },
];

export const formatVNToString = (keyword) => {
  let slug = keyword.toLowerCase();

  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");

  // Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );

  // Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");

  // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  slug = slug.replace(/\-+/gi, "-");

  // Xóa các ký tự gạch ngang ở đầu và cuối
  slug = slug.replace(/^\-+|\-+$/g, "");

  return slug;
};

export function formatPriceDisplay(price) {
  const formattedPrice = price.replace(/\./g, "");
  const length = formattedPrice.length;
  if (length <= 3) {
    return formattedPrice;
  } else if (length <= 6) {
    return `${formattedPrice.slice(0, length - 3)} nghìn`;
  } else if (length <= 9) {
    return `${formattedPrice.slice(0, length - 6)} triệu ${formattedPrice.slice(
      length - 6,
      length - 3
    )} nghìn`;
  } else {
    return `${formattedPrice.slice(0, length - 9)} tỷ ${formattedPrice.slice(
      length - 9,
      length - 6
    )} triệu ${formattedPrice.slice(length - 6, length - 3)} nghìn`;
  }
}

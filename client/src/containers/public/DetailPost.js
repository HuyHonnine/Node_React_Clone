import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SideBar } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { CurrentContact, SliderImg, Loading } from "../../components";
import { actionGetPostPagination } from "../../store/actions";
import { formatVNToString } from "../../ultils/constant";
import icons from "../../ultils/icons";
const {
  FaLocationDot,
  MdOutlinePriceChange,
  FaRegClock,
  TfiLayoutTabV,
  FaHashtag,
} = icons;

const DetailPost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (postId) {
      dispatch(actionGetPostPagination({ id: postId }));
    }
  }, [dispatch, postId]);
  if (!posts || posts.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="lg:text-mdbase text-base text-divBackground hover:text-btnBackground hover:underline"
        >
          Trang chủ
        </Link>
        <span className="m-1">/</span>
        <Link
          to={`/${formatVNToString(posts[0]?.categories?.value)}`}
          className="lg:text-mdbase text-base text-divBackground hover:text-btnBackground hover:underline"
        >
          {posts[0]?.categories?.value}
        </Link>
        <span className="m-1">/</span>
        <p className="lg:text-mdbase text-base text-gray-400 font-bold">
          {posts[0]?.title}
        </p>
      </div>
      <div className="flex gap-2">
        <div className="w-[70%] bg-white h-fit rounded-b-xl shadow-xl">
          <SliderImg
            images={
              posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
            }
          />
          <div className="space-y-4 p-4">
            <h2 className="text-btnBackground capitalize text-xl lg:text-2xl font-semibold">
              {posts[0]?.title}
            </h2>
            <p className="text-xs">
              Chuyên mục:{" "}
              <span className="text-divBackground hover:underline hover:text-btnBackground cursor-pointer">
                {posts[0]?.overviews?.area}
              </span>
            </p>
            <p className="text-xs flex items-center gap-1">
              <FaLocationDot className="text-divBackground" />
              Địa chỉ:
              <span>{posts[0]?.address}</span>
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-xl">
                <MdOutlinePriceChange />
                <p className="text-green-500 font-bold">
                  {posts[0]?.attributes?.price}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-semibold">
                <TfiLayoutTabV />
                <p>{posts[0]?.attributes?.acreage}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-semibold">
                <FaRegClock />
                <p>{posts[0]?.attributes?.published}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-semibold">
                <FaHashtag />
                <p>{posts[0]?.attributes?.hashtag}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold underline">
                Thông tin mô tả:
              </h3>
              <div className="flex flex-col gap-3">
                {JSON.parse(posts[0]?.description)}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold underline">
                Đặc điểm tin đăng :
              </h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-2">Mã tin:</td>
                    <td>{posts[0]?.overviews?.code}</td>
                  </tr>
                  <tr className="bg-gray-100 ">
                    <td className="p-2">Khu vực:</td>
                    <td>{posts[0]?.overviews?.area}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Loại tin rao:</td>
                    <td>{posts[0]?.overviews?.type}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="p-2">Đối tượng thuê:</td>
                    <td>{posts[0]?.overviews?.target}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Gói tin:</td>
                    <td>{posts[0]?.overviews?.bonus}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="p-2">Ngày đăng:</td>
                    <td>{posts[0]?.overviews?.created}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Ngày hết hạn: </td>
                    <td>{posts[0]?.overviews?.expired}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold underline">
                Thông tin liên hệ :
              </h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-2">Liên hệ:</td>
                    <td>{posts[0]?.user?.name}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="p-2">Điện thoại & Zalo: </td>
                    <td>{posts[0]?.user?.phone}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Facebook:</td>
                    <td>{posts[0]?.user?.fbUrl}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-[30%] space-y-2">
          <CurrentContact
            name={posts[0]?.user?.name}
            phone={posts[0]?.user?.phone}
            avatar={posts[0]?.user?.avatar}
          />
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;

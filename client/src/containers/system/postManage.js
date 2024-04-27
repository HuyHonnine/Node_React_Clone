import React, { useEffect, useState } from "react";
import { Path, Button, FilterManage, UpdatePost } from "../../components";
import { postMangeFilter } from "../../ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
import moment from "moment";
const PostManage = () => {
  const dispatch = useDispatch();
  const [isEidt, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("0");
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);

  useEffect(() => {
    !dataEdit && dispatch(actions.actionGetPostManage());
  }, [dataEdit, updateData]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);

  const checkStatus = (dateTime) => {
    let todayInSeconds = new Date().getTime();
    let expireDayInSeconds = dateTime.getTime();

    return todayInSeconds <= expireDayInSeconds
      ? "Đang hoạt động"
      : "Đã hết hạn";
  };

  const checkFilter = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const handleDeletePost = async (postId, userId) => {
    const response = await apiDeletePost(postId, userId);
    if (response?.data.err === 0) {
      setUpdateData((prev) => !prev);
      Swal.fire("Thành công!", "Xóa bài đăng thành công!", "success");
    } else Swal.fire("Thất bại!", "Xóa bài đăng thất bại!", "error");
  };
  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter((item) =>
      checkFilter(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    }
    if (status === 2) {
      const expiredPost = !postOfCurrent?.filter((item) =>
      checkFilter(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else {
      setPosts(postOfCurrent);
    }
  }, [status]);
  return (
    <div className="px-8 py-4 space-y-4 bg-white">
      <Path system title="Quản lý bài đăng" />
      <div className="flex items-center justify-between border-b-2 py-3">
        <h2 className="py-3 text-xl lg:text-2xl font-semibold">
          Quản lý tin đăng
        </h2>
        <div className="flex items-center gap-2">
          {/* <FilterManage
            onClick={(e) => handleFilterManage(+e.target.value)}
            itemFilter={postMangeFilter}
          /> */}
          <select
            onChange={(e) => setStatus(+e.target.value)}
            value={status}
            className="outline-none border p-2 border-gray-200 rounded-md text-mdbase text-gray-500"
          >
            <option value="0">Lọc theo trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Đã hết hạn</option>
          </select>
          <Button
            rounded="rounded-sm"
            paddingX="px-2"
            paddingY="py-1"
            text="Đăng tin mới"
            bgColor="bg-btnBackground"
            textColor="text-white"
            route="/he-thong/tao-moi-bai-dang"
          />
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-1 border-2">Mã tin</th>
            <th className="py-2 px-1 border-2">Ảnh đại diện</th>
            <th className="py-2 px-1 border-2">Tiêu đề</th>
            <th className="py-2 px-1 border-2">Giá</th>
            <th className="py-2 px-1 border-2">Ngày bắt đầu</th>
            <th className="py-2 px-1 border-2">Ngày hết hạn</th>
            <th className="py-2 px-1 border-2">Trạng thái</th>
            <th className="py-2 px-1 border-2">Tuỳ chọn</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {posts ? (
            posts?.map((item) => {
              const dateString = item?.overviews?.expired?.split(" ")[3];
              const [day, month, year] = dateString.split("/");
              const formattedDate = `${month}/${day}/${year}`;
              const timestamp = new Date(formattedDate).getTime();

              const status = checkStatus(new Date(timestamp));

              const className =
                status === "Đang hoạt động" ? "text-green-500" : "text-red-500";

              return (
                <tr className="w-[10rem]" key={item.id}>
                  <td className="py-2 px-1 border-2 text-center">
                    {item?.overviews?.code}
                  </td>
                  <td className="py-2 px-1 border-2 flex justify-center">
                    <img
                      className="w-[10rem] h-[10rem] object-cover rounded-lg"
                      src={JSON.parse(item?.images?.image)[0]}
                      alt="img"
                    />
                  </td>
                  <td className="py-2 px-1 border-2 text-center text-sm capitalize">
                    {item?.title}
                  </td>
                  <td className="py-2 px-1 border-2 text-center">
                    {item?.attributes?.price}
                  </td>
                  <td className="py-2 px-1 border-2 text-center">
                    {item?.overviews?.created}
                  </td>
                  <td className="py-2 px-1 border-2 text-center">
                    {item?.overviews?.expired}
                  </td>
                  <td
                    className={`py-2 px-1 border-2 text-center italic font-semibold ${className}`}
                  >
                    {status}
                  </td>
                  <td className="py-2 px-1 border-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        paddingX="px-3"
                        paddingY="py-1"
                        rounded="rounded-md"
                        text="Sửa"
                        textColor="text-white"
                        bgColor="bg-orange-400"
                        onClick={() => {
                          dispatch(actions.actionEditData(item));
                          setIsEdit((prev) => !prev);
                        }}
                      />
                      <Button
                        paddingX="px-3"
                        paddingY="py-1"
                        rounded="rounded-md"
                        text="Xóa"
                        textColor="text-white"
                        bgColor="bg-btnBackground"
                        onClick={() => handleDeletePost(item.id, item.userId)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <span className="text-mdbase lg:text-sm font-semibold">
              Bạn chưa có tin đăng nào.{" "}
              <Link
                className="text-divBackground hover:underline"
                to="/he-thong/tao-moi-bai-dang"
              >
                Bấm vào đây
              </Link>{" "}
              để bắt đầu đăng tin
            </span>
          )}
        </tbody>
      </table>
      {isEidt && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default PostManage;

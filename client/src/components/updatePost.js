import React from "react";
import { useSelector } from "react-redux";
import { CreatePost } from "../containers/system";
import icons from "../ultils/icons";
const { FaArrowLeft } = icons;

const UpdatePost = ({ setIsEdit }) => {
  const { dataEdit } = useSelector((state) => state.post);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
      className="fixed left-0 top-[-20px] bottom-0 right-0 z-50 bg-overlay-70 flex items-center justify-center overflow-auto "
    >
      <div
        className="w-[50%] h-[90%] bg-white rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          FaArrowLeft(true);
        }}
      >
        <div className="flex items-center p-2 border-b">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(false);
            }}
            className="cursor-pointer hover:text-btnBackground"
          >
            <FaArrowLeft />
          </span>
          <div className="space-y-2 mx-auto text-center">
            <p className="font-bold capitalize flex-grow ">
              Chỉnh sửa bài đăng
            </p>
            <p className="text-sm font-semibold ">{dataEdit.title}</p>
          </div>
        </div>
        <CreatePost dataEdit={dataEdit} />
      </div>
    </div>
  );
};

export default UpdatePost;

import React, { memo, useState, useEffect } from "react";
import { apiUpLoadImage } from "../services/post";
import icons from "../ultils/icons";
import { Loading } from "./index";
import { useSelector } from "react-redux";

const { TiDelete } = icons;

const InputFile = ({
  img,
  title,
  subimg,
  wImg,
  hImg,
  setValue,
  invalidFields,
}) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(false);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      let response = await apiUpLoadImage(formData);
      if (response.status === 200) {
        images = [...images, response.data?.secure_url];
      }
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setValue((prev) => ({
      ...prev,
      images: [...prev.images, ...images],
    }));
  };

  const [imagesPreview, setImagesPreview] = useState([]);
  const handleDeleteImg = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setValue((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  useEffect(() => {
    if (dataEdit && dataEdit?.images && dataEdit?.images?.image) {
      try {
        let images = JSON.parse(dataEdit?.images?.image);
        setImagesPreview(images);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [dataEdit]);
  return (
    <>
      <div className="space-y-2">
        <small className="font-medium">{title}</small>
        <div className="w-full">
          <label
            className="w-full border-dashed border-4 p-12 cursor-copy flex flex-col items-center justify-center gap-4"
            htmlFor="file"
          >
            {isLoading ? (
              <Loading />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img
                  className={`${wImg} ${hImg} object-cover`}
                  src={img}
                  alt={subimg}
                />
                <span className="font-medium">{subimg}</span>
              </div>
            )}
          </label>
          <input onChange={handleFiles} hidden type="file" id="file" multiple />
        </div>
      </div>
      <small className="text-red-500 italic lg:text-sm text-base">
        {invalidFields?.some((i) => i.name === "images") &&
          invalidFields?.find((i) => i.name === "images")?.message}
      </small>
      <div className="w-full">
        <h3 className="font-medium">Xem trước</h3>
        <div className="flex items-center gap-4">
          {imagesPreview?.map((item) => {
            return (
              <div className="w-[10rem] h-[10rem] relative" key={item.id}>
                <img
                  key={item}
                  src={item}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <span
                  title="Xóa"
                  onClick={() => handleDeleteImg(item)}
                  className="absolute cursor-pointer top-1 right-1 text-xl hover:text-btnBackground"
                >
                  <TiDelete />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(InputFile);

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ListItem } from "../../components/index";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const order = [
  { name: "Mặc định", path: "mac-dinh" },
  { name: "Mới nhất", path: "moi-nhat" },
  { name: "Có video", path: "co-video" },
];

const active =
  "p-[.2rem] bg-gray-200 lg:text-mdbase sm:text-[.8rem] font-bold underline rounded-sm transition-all";
const notActive =
  "p-[.2rem] bg-gray-200 lg:text-mdbase sm:text-[.8rem] rounded-sm transition-all hover:bg-emerald-300 ";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }

    let object = {};
    params?.forEach((i) => {
      if (Object.keys(object)?.some((item) => item === i[0])) {
        object[i[0]] = [...object[i[0]], i[1]];
      } else {
        object = { ...object, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) object.categoryCode = categoryCode;
    dispatch(actions.actionGetPostPagination(object));
  }, [searchParams, categoryCode]);

  return (
    <div className="border-2 rounded-xl shadow-xl p-4 flex flex-col gap-2 bg-white">
      <div className="rounded-xl flex flex-col justify-end gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold lg:text-base text-xl">
            Tổng 120.442 kết quả
          </h2>
          <span className="lg:text-mdbase text-gray-500 font-semibold">
            Cập nhật: 12:05 10/2/2024
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="lg:text-mdbase sm:text-base text-gray-600 mt-[.2rem]">
            Sắp xếp:{" "}
          </p>
          {order?.length > 0 &&
            order.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? active : notActive
                    }
                  >
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
      {posts?.length > 0 &&
        posts.map((item) => {
          return (
            <ListItem
              key={item.id}
              address={item.address}
              attributes={item.attributes}
              description={JSON.parse(item.description)}
              images={JSON.parse(item?.images?.image)}
              star={+item.star}
              title={item.title}
              user={item.user}
              createdAt={item.createdAt}
              id={item.id}
            />
          );
        })}
    </div>
  );
};

export default List;

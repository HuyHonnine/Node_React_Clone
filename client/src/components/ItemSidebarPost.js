import React, { useEffect } from "react";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ItemNew, ItemHot } from "./index";

const ItemSidebarPost = () => {
  const dispatch = useDispatch();
  const { newPosts, hotPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.actionGetNewPost());
    dispatch(actions.actionGetHotPost());
  }, []);
  return (
    <div className="space-y-2">
      <div className="p-4 bg-white border-2 rounded-xl shadow-xl space-y-4">
        <h3 className="font-bold lg:text-[1rem]">Tin mới đăng</h3>
        {newPosts.length > 0 &&
          newPosts.map((item) => {
            return (
              <ItemNew
                key={item.id}
                title={item.title}
                price={item.price}
                createdAt={item.createdAt}
                images={JSON.parse(item?.images?.image)}
              />
            );
          })}
      </div>
      <div className="p-4 bg-white border-2 rounded-xl shadow-xl space-y-4">
        <h3 className="font-bold lg:text-[1rem]">Tin Nổi bật</h3>
        {hotPosts.length > 0 &&
          hotPosts.map((item) => {
            return (
              <ItemHot
                key={item.id}
                title={item.title}
                price={item.price}
                createdAt={item.createdAt}
                images={JSON.parse(item?.images?.image)}
                star={item.star}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ItemSidebarPost;

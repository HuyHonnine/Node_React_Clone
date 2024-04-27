import React from "react";
import { useSelector } from "react-redux";
const PostSuggest = () => {
    const { categories } = useSelector((state) => state.app);
  return (
    <div>
      <h2>Cho thuê phòng trọ </h2>
    </div>
  );
};

export default PostSuggest;

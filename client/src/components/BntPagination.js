import React, { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
const notActive =
  "w-[40px] h-[40px] bg-white flex items-center justify-center hover:bg-gray-200 rounded-md cursor-pointer";
const active =
  "w-[40px] h-[40px] flex items-center justify-center bg-btnBackground text-white rounded-md cursor-pointer transition-all hover:opacity-90";

const BntPagination = ({ number, currentPage, icon, setCurrentPage, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSearch] = useSearchParams();
  let entries = paramsSearch.entries();

  const append = (entries) => {
    let params = [];
    paramsSearch.append("page", +number);
    for (let entry of entries) {
      params.push(entry);
    }
    let object = {};
    params?.forEach((i) => {
      if (
        Object.keys(object)?.some((item) => item === i[0] && item !== "page")
      ) {
        object[i[0]] = [...object[i[0]], i[1]];
      } else {
        object = { ...object, [i[0]]: [i[1]] };
      }
    });
    return object;
  };

  const handleChangePage = () => {
    setCurrentPage(+number);
    navigate({
      pathname: location.pathname,
      search: createSearchParams(append(entries)).toString(),
    });
  };

  return (
    <div
      className={+number === +currentPage ? active : notActive}
      onClick={handleChangePage}
    >
      {icon || number}
    </div>
  );
};

export default memo(BntPagination);

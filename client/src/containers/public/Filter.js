import React, { useState, useCallback, useEffect } from "react";
import { FilterItem, FilterPopUp, Button } from "../../components/index";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";

const {
  FaBuilding,
  FaDeleteLeft,
  FaArrowRight,
  FaSearch,
  FaMapMarkedAlt,
  IoTicket,
  FaLocationDot,
} = icons;
const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowFilter, setIsFilter] = useState(false);
  const [content, setContent] = useState("");
  const { provinces, prices, areas, categories } = useSelector(
    (state) => state.app
  );

  const [name, setName] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");

  useEffect(() => {
    if (!location?.pathname.includes(path.FILTER)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowFilter = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsFilter(true);
  };

  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsFilter(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowFilter, queries]
  );

  const handleFilter = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleFilter = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${queryTextObj.province ? `tỉnh ${queryTextObj.province},` : ""} ${
      queryTextObj.price ? `giá ${queryTextObj.price},` : ""
    } ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""} `;
    navigate(
      {
        pathname: path.FILTER,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleFilter } }
    );
  };

  return (
    <>
      <div className="flex items-center gap-3 bg-yellow-500 w-full rounded-lg p-3 mt-3 shadow-xl">
        <span
          onClick={() => handleShowFilter(categories, "category", "Tìm tất cả")}
          className="flex-1"
        >
          <FilterItem
            iconStart={<FaBuilding />}
            iconEnd={<FaDeleteLeft />}
            text={queries.category || "Phòng trọ, nhà trọ"}
            defaultText={"Tìm tất cả"}
          />
        </span>
        <span
          onClick={() => handleShowFilter(provinces, "province", "Toàn quốc")}
          className="flex-1"
        >
          <FilterItem
            iconStart={<FaMapMarkedAlt />}
            iconEnd={<FaArrowRight />}
            text={queries.province || "Toàn quốc"}
            defaultText={"Toàn quốc"}
          />
        </span>
        <span
          onClick={() => handleShowFilter(prices, "price", "Chọn giá")}
          className="flex-1"
        >
          <FilterItem
            iconStart={<IoTicket />}
            iconEnd={<FaArrowRight />}
            text={queries.price || "Chọn giá"}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => handleShowFilter(areas, "area", "Chọn diện tích")}
          className="flex-1"
        >
          <FilterItem
            iconStart={<FaLocationDot />}
            iconEnd={<FaArrowRight />}
            text={queries.area || "Chọn diện tích"}
            defaultText={"Chọn diện tích"}
          />
        </span>
        <span className="flex-1">
          <Button
            rounded="rounded-md"
            paddingX="px-6"
            paddingY="py-2"
            onClick={handleFilter}
            text={"Lọc bài đăng"}
            textColor="text-white"
            bgColor="bg-btnBackground"
            IcAfter={FaSearch}
          />
        </span>
      </div>
      {isShowFilter && (
        <FilterPopUp
          queries={queries}
          arrMinMax={arrMinMax}
          handleSubmit={handleSubmit}
          content={content}
          name={name}
          setIsFilter={setIsFilter}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Filter;

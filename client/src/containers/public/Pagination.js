import React, { useEffect, useState } from "react";
import { BntPagination } from "../../components/index";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { useSearchParams } from "react-router-dom";

const { GrLinkNext, GrLinkPrevious } = icons;

const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ishHideEnd, setIsHideEnd] = useState(false);
  const [ishHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
    let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    let start = currentPage - 2 < 1 ? 1 : currentPage - 2;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage >= maxPage - 2 ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);
  }, [count, posts, currentPage]);

  return (
    <div className="flex items-center justify-center gap-2 mt-4 mb-4">
      {!ishHideStart && (
        <BntPagination
          icon={<GrLinkPrevious />}
          setCurrentPage={setCurrentPage}
          number={1}
        />
      )}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <BntPagination
              key={item}
              number={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!ishHideEnd && (
        <BntPagination
          icon={<GrLinkNext />}
          setCurrentPage={setCurrentPage}
          number={Math.floor(count / posts.length)}
        />
      )}
    </div>
  );
};

export default Pagination;

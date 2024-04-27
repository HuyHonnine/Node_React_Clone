import React, { memo } from "react";
import { Link } from "react-router-dom";

const Path = ({ title, system }) => {
  return (
    <div >
      <div className="py-2 px-4 rounded-sm flex items-center">
        <Link to="/">
          <p className="text-sm text-divBackground hover:text-btnBackground hover:underline mr-1">
            Phongtro123.com
          </p>
        </Link>
        <span className="mr-1">/</span>
        {system && (
          <div className="flex items-center">
            <Link to="/he-thong/quan-ly-bai-dang">
              <p className="text-sm text-divBackground hover:text-btnBackground hover:underline mr-1">
                Quản lý
              </p>
            </Link>
            <span className="mr-1">/</span>
          </div>
        )}
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default memo(Path);

import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { intro } from "../ultils/constant";
import icons from "../ultils/icons";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { formatVNToString } from "../ultils/constant";
import * as actions from "../store/actions";

const { FaStar } = icons;
const star = [1, 2, 3, 4, 5];

const Intro = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.actionGetCategory());
  }, []);
  return (
    <div className="bg-white px-20 py-8 rounded-xl text-center space-y-4 shadow-xl mt-6">
      <h3 className="font-bold lg:text-base sm:text-mdbase">{intro.title}</h3>
      <p className="text-mdbase ">
        {intro.description1}{" "}
        {categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span key={index}>
                <span> </span>
                <Link
                  to={formatVNToString(item.value)}
                  className="text-divBackground font-semibold hover:underline hover:text-btnBackground"
                >
                  {item.value},
                </Link>{" "}
              </span>
            );
          })}{" "}
        <span>...</span> {intro.description2}
      </p>
      <div className="flex items-center justify-between">
        {intro.statistic.length > 0 &&
          intro.statistic.map((item, index) => {
            return (
              <div key={index}>
                <p className="font-bold">{item.value}</p>
                <span className="text-mdbase text-gray-400">{item.name}</span>
              </div>
            );
          })}
      </div>
      <h4 className="font-semibold">{intro.subtitle}</h4>
      <div className="flex items-center justify-center gap-1">
        {star.length > 0 &&
          star.map((index) => {
            return (
              <p key={index} className="text-yellow-400 ">
                <FaStar />
              </p>
            );
          })}
      </div>
      <div className="text-mdbase italic">
        <p>{intro.comment}</p>
        <span>{intro.user}</span>
      </div>
      <div>
        <p className="lg:text-base sm:text-base font-bold">{intro.question}</p>
        <span className="lg:text-mdbase ">{intro.answer}</span>
      </div>
      <div className="flex items-center justify-center">
        <Button
          text="Đăng tin ngay"
          textColor="text-white"
          bgColor="bg-btnBackground"
        />
      </div>
    </div>
  );
};
export default memo(Intro);

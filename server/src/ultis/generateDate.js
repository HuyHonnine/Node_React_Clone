import moment from "moment";
const formatDate = (timeObj) => {
  let dayNumber = timeObj.getDay();
  let day = dayNumber === 0 ? "Chủ nhật" : `Thứ ${dayNumber}`;

  let hours = timeObj.getHours().toString().padStart(2, "0");
  let minutes = timeObj.getMinutes().toString().padStart(2, "0");

  let date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;
  let time = `${hours}:${minutes}`;
  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expireDay = moment(today).add(gapExpire, "d").toDate();
  return {
    today: formatDate(today),
    expireDay: formatDate(expireDay),
  };
};

export default generateDate;

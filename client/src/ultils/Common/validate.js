const validate = (payload, setInvalidFields) => {
  setInvalidFields([]);

  let invalids = 0;
  let fields = Object.entries(payload);
  fields.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không được bỏ trống!",
        },
      ]);
      invalids++;
    }
  });
  fields.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 8) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu tối thiểu 8 ký tự!",
            },
          ]);
          invalids++;
        }
        break;
      case "phone":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ!",
            },
          ]);
          invalids++;
        }
        break;
      case "priceNumber":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa thêm giá trị!",
            },
          ]);
          invalids++;
        }
        break;

      case "areaNumber":
        const areaValue = parseFloat(item[1]); // Chuyển đổi giá trị sang số thực
        if (areaValue === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa thêm giá trị!",
            },
          ]);
          invalids++;
        }
        if (areaValue > 110) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Diện tích bé hơn hoặc bằng 110 m2",
            },
          ]);
          invalids++;
        }
        break;
      case "images":
        if (item[1].length < 4) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Phải có từ 4 tấm ảnh trở lên",
            },
          ]);
          invalids++;
        }
        break;

      default:
        break;
    }
  });
  return invalids;
};

export default validate;

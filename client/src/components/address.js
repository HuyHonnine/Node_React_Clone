import React, { useEffect, useState, memo } from "react";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services";
import { Select } from "./index";
import { useSelector } from "react-redux";
const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [reset, setRest] = useState(false);
  const { dataEdit } = useSelector((state) => state.post);

  useEffect(() => {
    if (provinces && provinces?.length > 0 && dataEdit?.address) {
      let addressArr = dataEdit.address.split(",");
      let foundProvince = provinces.find(
        (item) =>
          item.province_name === addressArr[addressArr.length - 1]?.trim()
      );
      setProvince(foundProvince ? foundProvince.province_id : "");
    }
  }, [provinces, dataEdit]);

  useEffect(() => {
    if (districts && districts?.length > 0 && dataEdit?.address) {
      let addressArr = dataEdit.address.split(",");
      let foundDistrict = districts.find(
        (item) =>
          item.district_name === addressArr[addressArr.length - 2]?.trim()
      );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts, dataEdit]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchDistricts = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchDistricts();
    !province ? setRest(true) : setRest(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
  }, [province, district]);
  return (
    <div className="w-[70%] space-y-8">
      <div className="space-y-4">
        <h2 className="text-base lg:text-xl font-medium">Địa chỉ cho thuê</h2>
        <div className="flex items-center gap-5">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            type="province"
            value={province}
            setValue={setProvince}
            option={provinces}
            label="Tỉnh/Thành phố"
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            reset={reset}
            type="district"
            value={district}
            setValue={setDistrict}
            option={districts}
            label="Quận/Huyện"
          />
        </div>
        <div className="space-y4">
          <div className="space-y-2">
            <label htmlFor="correctAddress" className="font-medium">
              Địa chỉ chính xác
            </label>
            <input
              id="correctAddress"
              value={`${
                district
                  ? `${
                      districts?.find((item) => item.district_id === district)
                        ?.district_name
                    },`
                  : ""
              } ${
                province
                  ? provinces?.find((item) => item.province_id === province)
                      ?.province_name
                  : ""
              }`}
              type="text"
              readOnly
              className="px-2 py-1 bg-gray-200 rounded-md w-full border-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Address);

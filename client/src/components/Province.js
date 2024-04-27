import React from 'react'
import { ProvinceBtn } from "./index";
import { locationCity } from '../ultils/constant';

const Province = () => {
  return (
    <div>
      <div className='flex justify-center items-center gap-4 mt-6'>
        {locationCity?.length > 0 && locationCity.map(item =>(
          <ProvinceBtn key={item.id} img={item.img} title={item.title} />
        ))}
      </div>
    </div>
  )
}

export default Province

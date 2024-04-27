import React, {memo} from 'react'
import { Link } from "react-router-dom"

const ProvinceBtn = ({title, img}) => {
  return (
      <div className='flex justify-center items-center gap-4 mt-6 hover:text-btnBackground text-divBackground'>
          <div className='shadow-xl  rounded-b-lg'>
            <Link>
              <img className='w-[220px] h-[110px] object-cover rounded-t-lg' src={img} alt={title} />
            </Link>
            <div className='px-[1rem] py-[.5rem] text-center'>
              <Link>
              <p className='font-semibold lg:text-[.75rem] sm:text-xl '>{title}</p>
              </Link>
            </div>
          </div>
    </div>
  )
}

export default memo(ProvinceBtn)

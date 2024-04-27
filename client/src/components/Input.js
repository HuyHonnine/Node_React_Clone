import React, {memo} from 'react'

const Input = ({label, IcAfter, value, setValue, keyPayload, invalidFields, setInvalidFields, type}) => {
  return (
    <div className='space-y-2'>
      <label 
        htmlFor='phone' 
        className='flex gap-2 items-center lg:text-sm font'><span>{IcAfter && <IcAfter />}</span>{label}
      </label>
      <input 
        type={type || 'text'}
        id='phone' 
        className='outline-none bg-inputColor p-4 rounded-md w-full'
        value={value} 
        onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]:e.target.value }))} 
        onFocus={()=>{setInvalidFields([])}}
        >
      </input>
      {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className='text-red-500 italic'>{invalidFields.find(i=>i.name===keyPayload)?.message}</small>}
    </div>
  )
}

export default memo(Input)

import React from 'react'

const Button = (props) => {
  return (
    <button className="bg-black hover:text-amber-700 text-white cursor-pointer font-bold  px-6 py-3 rounded-sm z-50">
      {props.name}
    </button>
  )
}

export default Button
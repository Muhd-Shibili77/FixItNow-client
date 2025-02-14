import React from 'react'

function Button(props) {
  return (
    <button type="{props.type}" className={`w-full max-w-xs ${props.color} text-white py-3 px-4 rounded-lg hover:${props.hover} transition-colors`}>
                {props.text}
    </button>
  )
}

export default Button
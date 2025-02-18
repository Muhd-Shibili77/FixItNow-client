import React from 'react'

function Button(props) {
  return (
    <button type={props.type || "button"} className={`w-full max-w-xs ${props.color} text-white py-3 px-4 rounded-lg hover:${props.hover} transition-colors`} onClick={props.function || '' }>
                {props.text}
    </button>
  )
}

export default Button
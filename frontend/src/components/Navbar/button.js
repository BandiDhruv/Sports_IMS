import React from 'react'
import "./button.css"
const button = (props) => {
  return (
    <button className='btns'>{props.text}</button>
  )
}

export default button
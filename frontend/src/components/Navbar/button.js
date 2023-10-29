import React from 'react'
import "./button.css"
import { Link } from 'react-router-dom'
const button = (props) => {
  return (
    // <Link to={`/${props.text}`}>
        <button className='btns'>{props.text}</button>
    // </Link>
  )
}

export default button
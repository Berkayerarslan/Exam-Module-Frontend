import React from 'react'

const Button = (props) => {
  return (
    <>
    <a onClick={(e)=> props.onClick(e)}>
      <i
        className={props.class}
        style={{ marginRight: "5px" }}
      ></i>
      <span>{props.text}</span>
    </a>
    </>
  )
}

export default Button
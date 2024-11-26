import React from 'react'

export default function Square({handleClick, value, highlighted}) {
  return (
    <div>
      <button className={highlighted ? "highlighted squares": "squares"} onClick={handleClick}>{value}</button>
    </div>
  )
}

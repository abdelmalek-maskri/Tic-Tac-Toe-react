import React from 'react'

export default function Square({handleClick, value}) {
  return (
    <div>
      <button className="squares" onClick={handleClick}>{value}</button>
    </div>
  )
}

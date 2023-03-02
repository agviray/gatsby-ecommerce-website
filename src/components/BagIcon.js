import React, { useState, useEffect } from "react"
import { container, itemCounter, bag } from "../styles/bag-icon.module.css"
import icon from "../images/bag-icon.svg"

const BagIcon = () => {
  const [totalItems, setItemCount] = useState(null)

  // useEffect(() => {}, [])

  const renderItemCounter = total => {
    return total ? <span className={itemCounter}>{total}</span> : null
  }
  return (
    <div className={container}>
      {renderItemCounter(totalItems)}
      <div className={bag}>
        <img src={icon} alt="bag icon" />
      </div>
    </div>
  )
}

export default BagIcon

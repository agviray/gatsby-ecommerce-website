import React from "react"
import { container, itemCounter, bag } from "../styles/bag-icon.module.css"
import icon from "../images/bag-icon.svg"
import { BagContext } from "./BagContextComponent"

const BagIcon = () => {
  const renderItemCounter = total => {
    return total ? <span className={itemCounter}>{total}</span> : null
  }
  return (
    <BagContext.Consumer>
      {value => (
        <div className={container}>
          {renderItemCounter(value.itemCount)}
          <div className={bag}>
            <img src={icon} alt="bag icon" />
          </div>
        </div>
      )}
    </BagContext.Consumer>
  )
}

export default BagIcon

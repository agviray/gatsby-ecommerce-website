import React from "react"
import icon from "../images/bag-icon.svg"
import { BagContext } from "./BagContextComponent"

const BagIcon = () => {
  const renderItemCounter = total => {
    return total ? <span className="counter">{total}</span> : null
  }
  return (
    <BagContext.Consumer>
      {value => (
        <div className="bagIcon">
          {renderItemCounter(value.itemCount)}
          <div className="imgContainer">
            <img src={icon} alt="bag icon" />
          </div>
        </div>
      )}
    </BagContext.Consumer>
  )
}

export default BagIcon

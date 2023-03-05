import React, { useState, useEffect } from "react"
import {
  quantityEditorContainer,
  button,
  quantityAmount,
} from "../styles/QuantityEditor.module.css"
import { BagContext } from "./BagContextComponent"

const QuantityEditor = ({ quantity }) => {
  // const [itemQuantity, setItemQuantity] = useState(quantity)
  // useEffect(() => {}, [])
  const changeQuantity = () => {
    return
  }

  {
    /* <BagContext.Consumer>
        {value => (
          <>
          </>
        )}
      </BagContext.Consumer> */
  }
  return (
    <div className={quantityEditorContainer}>
      <span onClick={changeQuantity} className={button}>
        -
      </span>
      <span className={quantityAmount}>{quantity}</span>
      <span onClick={changeQuantity} className={button}>
        +
      </span>
    </div>
  )
}

export default QuantityEditor

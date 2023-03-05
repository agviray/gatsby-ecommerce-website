import React from "react"
import {
  quantityEditorContainer,
  button,
  quantityAmount,
} from "../styles/QuantityEditor.module.css"
import { BagContext } from "./BagContextComponent"

const QuantityEditor = ({ item }) => {
  const decreaseQty = (item, qty, bagContext) => {
    const observedItem = { ...item }
    const newQty = qty - 1
    bagContext.editItemQuantity(item, observedItem.id, newQty)
  }

  const increaseQty = (item, qty, bagContext) => {
    const observedItem = { ...item }
    const newQty = qty + 1
    bagContext.editItemQuantity(item, observedItem.id, newQty)
  }

  return (
    <div className={quantityEditorContainer}>
      <BagContext.Consumer>
        {value => (
          <>
            <span
              onClick={() => decreaseQty(item, item.quantity, value)}
              className={button}
            >
              -
            </span>
            <span className={quantityAmount}>{item.quantity}</span>
            <span
              onClick={() => increaseQty(item, item.quantity, value)}
              className={button}
            >
              +
            </span>
          </>
        )}
      </BagContext.Consumer>
    </div>
  )
}

export default QuantityEditor

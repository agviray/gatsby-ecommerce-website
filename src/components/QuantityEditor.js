import React, { useState } from "react"
import {
  quantityEditorWrapper,
  quantityEditorContainer,
  button,
  quantityAmount,
  removeButton,
  confirmationBox,
  buttonContainer,
  cancelButton,
} from "../styles/quantity-editor.module.css"
import { BagContext } from "./BagContextComponent"
import Modal from "./Modal"

const QuantityEditor = ({ item }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
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

  const updateShowConfirmation = status => {
    setShowConfirmation(status)
  }

  const removeItemFromBag = (e, item, bagContext) => {
    e.preventDefault()
    const itemId = item.id
    bagContext.removeItem(itemId)
    updateShowConfirmation(false)
  }

  return (
    <div className={quantityEditorWrapper}>
      <BagContext.Consumer>
        {value => (
          <>
            <div className={quantityEditorContainer}>
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
            </div>
            <span
              className={removeButton}
              onClick={() => updateShowConfirmation(true)}
            >
              Remove
            </span>
            <Modal activeStatus={showConfirmation}>
              <div className={confirmationBox}>
                Remove this item from your bag?
                <div className={buttonContainer}>
                  <button onClick={e => removeItemFromBag(e, item, value)}>
                    REMOVE ITEM
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault()
                      updateShowConfirmation(false)
                    }}
                    className={cancelButton}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </BagContext.Consumer>
    </div>
  )
}

export default QuantityEditor

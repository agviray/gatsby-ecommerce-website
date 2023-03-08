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
    let currentBagItems = [...bagContext.itemsInBag]
    const updatedItem = { ...item, quantity: qty - 1 }
    currentBagItems[item.id] = updatedItem
    const updatedBagItems = currentBagItems.map((item, index) => ({
      ...item,
      id: index,
    }))

    bagContext.updateItemsInBag([...updatedBagItems])
  }

  const increaseQty = (item, qty, bagContext) => {
    let currentBagItems = [...bagContext.itemsInBag]
    const updatedItem = { ...item, quantity: qty + 1 }
    currentBagItems[item.id] = updatedItem
    const updatedBagItems = currentBagItems.map((item, index) => ({
      ...item,
      id: index,
    }))

    bagContext.updateItemsInBag([...updatedBagItems])
  }

  const updateShowConfirmation = status => {
    setShowConfirmation(status)
  }

  const removeItemFromBag = (e, item, bagContext) => {
    e.preventDefault()
    const currentBagItems = [...bagContext.itemsInBag]
    const idOfItemToRemove = item.id
    let updatedBagItems = currentBagItems.filter((item, index, thisArray) => {
      if (thisArray.indexOf(item) !== idOfItemToRemove) {
        return item
      }
    })
    updatedBagItems.forEach((item, index) => {
      item.id = index
    })
    bagContext.updateItemsInBag([...updatedBagItems])
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

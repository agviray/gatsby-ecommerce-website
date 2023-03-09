import React, { useState, useEffect } from "react"
import {
  quantityEditorWrapper,
  quantityEditorContainer,
  button,
  hidden,
  quantityAmount,
  removeButton,
  confirmationBox,
  contentContainer,
  imageContainer,
  detail,
  buttonContainer,
  cancelButton,
} from "../styles/quantity-editor.module.css"
import { BagContext } from "./BagContextComponent"
import Modal from "./Modal"

const initialItemToRemove = {}

const QuantityEditor = ({ item }) => {
  const [itemToRemove, setItemToRemove] = useState(initialItemToRemove)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  useEffect(() => {
    if (isConfirmationOpen) {
      document.body.style.overflow = "hidden"
    }

    if (!isConfirmationOpen) {
      document.body.style.overflow = "visible"
    }
  }, [isConfirmationOpen])

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

  const displayConfirmation = (status, item) => {
    setItemToRemove({ ...item })
    setIsConfirmationOpen(status)
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
    displayConfirmation(false, initialItemToRemove)
  }

  return (
    <div className={quantityEditorWrapper}>
      <BagContext.Consumer>
        {value => (
          <>
            <div className={quantityEditorContainer}>
              <span
                onClick={() => decreaseQty(item, item.quantity, value)}
                className={`${button} ${item.quantity < 2 ? `${hidden}` : ""}`}
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
              onClick={() => displayConfirmation(true, { ...item })}
            >
              Remove
            </span>
            <Modal activeStatus={isConfirmationOpen}>
              <div className={confirmationBox}>
                Remove this item from your bag?
                {Object.keys(itemToRemove).length === 0 ? null : (
                  <div className={contentContainer}>
                    <div className={imageContainer}>
                      <img
                        src={itemToRemove.image.images.fallback.src}
                        alt={itemToRemove.name}
                      />
                    </div>
                    <div className={detail}>
                      <h3>{itemToRemove.name}</h3>
                      <p>Size: {itemToRemove.size}</p>
                      <p>Price: {itemToRemove.price}</p>
                    </div>
                  </div>
                )}
                <div className={buttonContainer}>
                  <button onClick={e => removeItemFromBag(e, item, value)}>
                    REMOVE ITEM
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault()
                      displayConfirmation(false, initialItemToRemove)
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

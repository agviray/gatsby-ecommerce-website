import React, { useState } from "react"
import { BagContext } from "./BagContextComponent"
import Modal from "./Modal"

const initialItemToRemove = {}

const QuantityEditor = ({ item }) => {
  const [itemToRemove, setItemToRemove] = useState(initialItemToRemove)
  const [displayModal, setDisplayModal] = useState(false)

  const displayConfirmation = (status, item) => {
    setItemToRemove({ ...item })
    setDisplayModal(status)
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
    <div className="quantityEditor">
      <BagContext.Consumer>
        {value => (
          <>
            <div className="amountControls">
              <span
                onClick={() => value.decreaseQty(item)}
                className={`button ${item.quantity < 2 ? "hidden" : ""}`}
              >
                -
              </span>
              <span className="amount">{item.quantity}</span>
              <span onClick={() => value.increaseQty(item)} className="button">
                +
              </span>
            </div>
            <span
              className="removeButton"
              onClick={() => displayConfirmation(true, { ...item })}
            >
              Remove
            </span>
            <Modal activeStatus={displayModal}>
              <div className="messageBox">
                <p className="modalHeading">Remove this item?</p>
                {Object.keys(itemToRemove).length === 0 ? null : (
                  <div className="quantityEditorModalContent">
                    <div className="imgContainer">
                      <img
                        src={itemToRemove.image.images.fallback.src}
                        alt={itemToRemove.name}
                      />
                    </div>
                    <div className="detail">
                      <h3>{itemToRemove.name}</h3>
                      <p>Size: {itemToRemove.size}</p>
                      <p>Price: {itemToRemove.price}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={e => removeItemFromBag(e, item, value)}
                  className="modalButton"
                >
                  REMOVE ITEM
                </button>
                <button
                  onClick={e => {
                    e.preventDefault()
                    displayConfirmation(false, initialItemToRemove)
                  }}
                  className="cancelButton"
                >
                  CANCEL
                </button>
              </div>
            </Modal>
          </>
        )}
      </BagContext.Consumer>
    </div>
  )
}

export default QuantityEditor

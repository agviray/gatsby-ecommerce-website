import React, { useState, useEffect } from "react"

const initialStoredBag = { items: [], itemCount: null }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [itemCount, setItemCount] = useState(null)
  // const [removedItem, setRemovedItem] = useState({})

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))

    if (!storedBag) {
      localStorage.setItem("bag", JSON.stringify(initialStoredBag))
    }

    if (storedBag) {
      const storedItems = [...storedBag.items]
      setItemsInBag([...storedItems])
    }
  }, [])

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    let newBagItems = [...itemsInBag]
    let totalItems = 0

    if (storedBag) {
      newBagItems.forEach(item => {
        totalItems += item.quantity
      })
      let newBag = { items: [...newBagItems], itemCount: totalItems }
      localStorage.setItem("bag", JSON.stringify({ ...newBag }))
      setItemCount(totalItems)
    }
  }, [itemsInBag])

  const addItem = addedItem => {
    const currentBagItems = [...itemsInBag]
    let updatedBagItems = [...currentBagItems]
    const newItem = { ...addedItem }
    let newItemIsCopy = false

    if (currentBagItems.length === 0) {
      setItemsInBag([newItem])
    } else {
      currentBagItems.forEach((item, index) => {
        if (item.name === newItem.name && item.size === newItem.size) {
          const updatedItem = { ...item, quantity: item.quantity + 1 }
          updatedBagItems[index] = updatedItem
          newItemIsCopy = true
        }
      })
      return newItemIsCopy
        ? setItemsInBag([...updatedBagItems])
        : setItemsInBag([...updatedBagItems, newItem])
    }
  }

  // const removeItem = item => {
  //   setRemovedItem({ ...item })
  // }

  const contextValue = {
    itemsInBag: itemsInBag,
    itemCount: itemCount,
    addItem: addItem,
    // removeItem: removeItem,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

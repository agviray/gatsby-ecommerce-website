import React, { useState, useEffect, useContext } from "react"

const initialStoredBag = { items: [] }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [addedItem, setAddedItem] = useState({})
  const [removedItem, setRemovedItem] = useState({})

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))

    if (!storedBag) {
      localStorage.setItem("bag", JSON.stringify(initialStoredBag))
    }
  }, [])

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    const storedBagItems = [...storedBag.items]
    let newBagItems

    if (itemsInBag.length === 0) {
      newBagItems = [...storedBagItems]
    }
    if (storedBag) {
      if (Object.keys(addedItem).length !== 0) {
        const newBagToStore = {
          ...storedBag,
          items: [...newBagItems, addedItem],
        }
        localStorage.setItem("bag", JSON.stringify(newBagToStore))
      }
    }
  }, [addedItem])

  const addItem = item => {
    setAddedItem({ ...item })
  }

  const removeItem = item => {
    setRemovedItem({ ...item })
  }

  const contextValue = {
    itemsInBag: itemsInBag,
    addItem: addItem,
    removeItem: removeItem,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

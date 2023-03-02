import React, { useState, useEffect, useContext } from "react"

const initialStoredBag = { items: [] }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [newItem, setNewItem] = useState({})

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
      if (Object.keys(newItem).length !== 0) {
        const newBagToStore = { ...storedBag, items: [...newBagItems, newItem] }
        localStorage.setItem("bag", JSON.stringify(newBagToStore))
      }
    }
  }, [newItem])

  const addNewItem = item => {
    setNewItem({ ...item })
  }

  const contextValue = {
    itemsInBag: itemsInBag,
    addNewItem: addNewItem,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

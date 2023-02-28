import React, { useState, useEffect, useContext } from "react"

export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [newItem, setNewItem] = useState({})

  useEffect(() => {
    const item = { ...newItem }
    if (Object.keys(item).length !== 0) {
      setItemsInBag([...itemsInBag, item])
    }
  }, [newItem])

  useEffect(() => {
    console.log(itemsInBag)
  }, [itemsInBag])

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

import React, { useState, useEffect, useContext } from "react"

const initialStoredBag = { items: [], itemCount: null }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [itemCount, setItemCount] = useState(null)
  const [addedItem, setAddedItem] = useState({})
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
    const updateItemCount = bag => {
      const totalItems = itemsInBag.length
      const storedTotalItems = bag.itemCount
      if (storedTotalItems !== totalItems) {
        const newBagToStore = { ...storedBag, itemCount: totalItems }
        localStorage.setItem("bag", JSON.stringify(newBagToStore))
        setItemCount(totalItems)
      }
    }

    if (storedBag) {
      updateItemCount(storedBag)
    }
  }, [itemsInBag])

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    const storedBagItems = [...storedBag.items]
    let newBagItems = [...storedBagItems]

    if (storedBag) {
      if (Object.keys(addedItem).length !== 0) {
        const newBagToStore = {
          ...storedBag,
          items: [...newBagItems, addedItem],
        }
        localStorage.setItem("bag", JSON.stringify(newBagToStore))
        setItemsInBag([...newBagItems, addedItem])
      }
    }
  }, [addedItem])

  const addItem = item => {
    setAddedItem({ ...item })
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

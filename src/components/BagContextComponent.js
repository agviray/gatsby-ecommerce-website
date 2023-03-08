import React, { useState, useEffect } from "react"

const initialStoredBag = { items: [], itemCount: null }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [itemCount, setItemCount] = useState(null)

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
    const newBagItems = [...itemsInBag]
    let totalItems = 0

    if (storedBag) {
      newBagItems.forEach(item => {
        totalItems += item.quantity
      })
      const newBag = { items: [...newBagItems], itemCount: totalItems }
      localStorage.setItem("bag", JSON.stringify({ ...newBag }))
      setItemCount(totalItems)
    }
  }, [itemsInBag])

  const updateItemsInBag = updatedBagItems => {
    setItemsInBag([...updatedBagItems])
  }

  const contextValue = {
    itemsInBag: itemsInBag,
    itemCount: itemCount,
    updateItemsInBag: updateItemsInBag,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

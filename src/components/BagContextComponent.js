import React, { useState, useEffect } from "react"

const initialStoredBag = { items: [], itemCount: null, itemsTotal: null }
export const BagContext = React.createContext()

const BagContextProvider = ({ children }) => {
  const [itemsInBag, setItemsInBag] = useState([])
  const [itemCount, setItemCount] = useState(null)
  const [itemsTotal, setItemsTotal] = useState(null)

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
    const calculateGrandTotal = items => {
      const currentItems = [...items]
      let itemsOnlyTotal = 0

      currentItems.forEach(item => {
        let itemQuantity = item.quantity
        let itemPrice = parseInt(item.price.replace("$", "")) * itemQuantity
        itemsOnlyTotal += itemPrice
      })

      return itemsOnlyTotal.toFixed(2)
    }
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    const newBagItems = [...itemsInBag]
    const itemsOnlyTotal = calculateGrandTotal(itemsInBag)
    let totalItems = 0

    if (storedBag) {
      newBagItems.forEach(item => {
        totalItems += item.quantity
      })
      let newBag = {
        items: [...newBagItems],
        itemCount: totalItems,
        itemsTotal: itemsOnlyTotal,
      }

      localStorage.setItem("bag", JSON.stringify({ ...newBag }))
      setItemCount(totalItems)
      setItemsTotal(itemsOnlyTotal)
    }
  }, [itemsInBag])

  const updateItemsInBag = updatedBagItems => {
    setItemsInBag([...updatedBagItems])
  }

  const contextValue = {
    itemsInBag: itemsInBag,
    itemCount: itemCount,
    itemsTotal: itemsTotal,
    updateItemsInBag: updateItemsInBag,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

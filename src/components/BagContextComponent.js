import React, { useState, useEffect } from "react"

const initialStoredBag = {
  items: [],
  itemCount: null,
  itemsTotal: null,
}

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

  const addItemToBag = (item, callback) => {
    let currentBagItems = [...itemsInBag]
    let updatedBagItems = [...currentBagItems]
    let itemToAdd = { ...item }
    let itemToAddIsCopy = false

    // - If bag has zero items, add item as first item, and
    //   assign 0 as the item id.
    if (currentBagItems.length === 0) {
      itemToAdd = { ...itemToAdd, id: 0 }
      updatedBagItems = [itemToAdd]
      updateItemsInBag(updatedBagItems)
      callback(false, `Item ${item.name} was added to your  bag`)
    } else {
      // - If bag does not have 0 items, first check if item being added is
      //   the same as an item that already is in the bag.
      currentBagItems.forEach((item, index, thisArray) => {
        item.id = index
        // - If item being added is the same as an existing bag item,
        //   just increase item's quantity by 1, and replace the
        //   original bag item with the updated bag item.
        // - Also set itemToAddIsCopy flag to true.
        if (item.name === itemToAdd.name && item.size === itemToAdd.size) {
          const updatedItem = {
            ...itemToAdd,
            id: item.id,
            quantity: item.quantity + 1,
          }
          thisArray[index] = updatedItem
          itemToAddIsCopy = true
        }
      })
      // - Update updatedBagItems to contain the values of the
      //   altered currentBagItems array.
      updatedBagItems = [...currentBagItems]
      // - If itemToAddIsCopy is still false after the first check, we
      //   now know for sure that itemToAdd is not a copy.
      // - We can now safely just add a new id to the itemToAdd, then
      //   add it to the end of the bag items list.
      if (itemToAddIsCopy === false) {
        itemToAdd.id = updatedBagItems.length
        updatedBagItems = [...updatedBagItems, itemToAdd]
      }
      // - After all checks are completed, we can update
      //   the bagItems state.
      updateItemsInBag(updatedBagItems)
      callback(false, `Item ${item.name} was added to your  bag`)
    }
  }

  // - Handles the + button click in QuantityEditor.
  // - Increases the quantity of the item displayed.
  const increaseQty = item => {
    let currentBagItems = [...itemsInBag]
    const updatedItem = { ...item, quantity: item.quantity + 1 }
    currentBagItems[item.id] = updatedItem
    const updatedBagItems = currentBagItems.map((item, index) => ({
      ...item,
      id: index,
    }))
    updateItemsInBag([...updatedBagItems])
  }

  // - Handles the - button click in QuantityEditor.
  // - Decreases the quantity of the item displayed.
  const decreaseQty = item => {
    let currentBagItems = [...itemsInBag]
    const updatedItem = { ...item, quantity: item.quantity - 1 }
    currentBagItems[item.id] = updatedItem
    const updatedBagItems = currentBagItems.map((item, index) => ({
      ...item,
      id: index,
    }))
    updateItemsInBag([...updatedBagItems])
  }

  // - Removes an item from the bag.
  const removeItemFromBag = item => {
    const currentBagItems = [...itemsInBag]
    const idOfItemToRemove = item.id
    let updatedBagItems = currentBagItems.filter((item, index, thisArray) => {
      if (thisArray.indexOf(item) !== idOfItemToRemove) {
        return item
      }
    })
    updatedBagItems.forEach((item, index) => {
      item.id = index
    })
    updateItemsInBag([...updatedBagItems])
  }

  const contextValue = {
    itemsInBag: itemsInBag,
    itemCount: itemCount,
    itemsTotal: itemsTotal,
    updateItemsInBag: updateItemsInBag,
    addItemToBag: addItemToBag,
    increaseQty: increaseQty,
    decreaseQty: decreaseQty,
    removeItemFromBag: removeItemFromBag,
  }

  return (
    <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>
  )
}

export default BagContextProvider

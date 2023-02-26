import React, { useState, useEffect, createContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "./Navbar"
import FooterContent from "./FooterContent"
import "../styles/global.css"

export const BagContext = createContext(null)

const initialNewItem = {
  image: "",
  name: "",
  price: null,
  size: "",
  quantity: null,
}

export default function Layout({ children }) {
  const [itemsInBag, setItemsInBag] = useState([])
  const [newItem, setNewItem] = useState({})

  useEffect(() => {
    const addedItem = { ...newItem }
    console.log(`
      ***********
      ADDED ITEM
      ${addedItem}
      ***********`)

    if (Object.keys(addedItem).length !== 0) {
      setItemsInBag([...itemsInBag, addedItem])
    }
  }, [newItem])

  useEffect(() => {
    console.log(`
    |||||||||||||||||||||||||||||||||||||||||||||
    ITEMS IN BAG
    |||||||||||||||||||||||||||||||||||||||||||||
    `)
    console.log(itemsInBag)
  }, [itemsInBag])

  const data = useStaticQuery(graphql`
    query LayoutComponent {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  const addNewItem = item => {
    console.table(item)
  }

  return (
    <>
      <BagContext.Provider
        value={{
          itemsInBag: [...itemsInBag],
          onNewItemChange: addNewItem,
        }}
      >
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <FooterContent title={title} />
        </footer>
      </BagContext.Provider>
    </>
  )
}

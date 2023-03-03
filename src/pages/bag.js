import React, { useState, useEffect } from "react"
import {
  container,
  heading,
  content,
  contentBlock,
  empty,
} from "../styles/bag.module.css"
import Layout from "../components/Layout"
import BagItemCard from "../components/BagItemCard"
import { BagContext } from "../components/BagContextComponent"

const initialItems = []

export default function Bag() {
  const [items, setItems] = useState([])

  const renderItems = items => {
    if (items.length === 0) {
      return <p className={empty}>Your bag is empty</p>
    }
    return items.map((item, index) => <BagItemCard key={index} item={item} />)
  }

  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>SHOPPING BAG</h2>
        </div>
        <div className={content}>
          <div className={`${contentBlock} ${empty}`}>
            <BagContext.Consumer>
              {value => renderItems(value.itemsInBag)}
            </BagContext.Consumer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import React, { useState, useEffect } from "react"
import {
  container,
  heading,
  content,
  contentBlock,
  empty,
} from "../styles/bag.module.css"
import Layout from "../components/Layout"

const initialItems = [
  {
    image: "",
    name: "",
    price: null,
    size: "",
    quantity: null,
  },
]

export default function Bag() {
  const [items, setItems] = useState([])

  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>SHOPPING BAG</h2>
        </div>
        <div className={content}>
          <div className={`${contentBlock} ${empty}`}>
            {items.length === 0 ? (
              <p>Your bag is empty</p>
            ) : (
              <p>Your bag is not empty</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

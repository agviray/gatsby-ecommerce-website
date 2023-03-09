import React, { useState, useEffect } from "react"
import {
  container,
  heading,
  content,
  contentBlock,
  empty,
  cardContentHeadings,
} from "../styles/bag.module.css"
import Layout from "../components/Layout"
import BagItemCard from "../components/BagItemCard"
import { BagContext } from "../components/BagContextComponent"
import OrderSummary from "../components/OrderSummary"

const Bag = () => {
  const renderItems = itemsToRender => {
    if (itemsToRender.length === 0) {
      return <p className={empty}>Your bag is empty</p>
    }
    return (
      <>
        <div className={cardContentHeadings}>
          <h2>ITEM</h2>
          <h2>QTY</h2>
        </div>
        {itemsToRender.map((item, index) => (
          <BagItemCard key={index} item={item} />
        ))}
      </>
    )
  }

  const renderOrderSummary = bagContext => {
    return <OrderSummary bagContext={bagContext} />
  }

  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>SHOPPING BAG</h2>
        </div>
        <div className={content}>
          <div className={`${contentBlock}`}>
            <BagContext.Consumer>
              {value => renderItems([...value.itemsInBag])}
            </BagContext.Consumer>
          </div>
          <BagContext.Consumer>
            {value => renderOrderSummary(value)}
          </BagContext.Consumer>
        </div>
      </div>
    </Layout>
  )
}

export default Bag

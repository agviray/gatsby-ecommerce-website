import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import BagItemCard from "../components/BagItemCard"
import { BagContext } from "../components/BagContextComponent"
import OrderSummary from "../components/OrderSummary"

const Bag = () => {
  const renderItems = itemsToRender => {
    if (itemsToRender.length === 0) {
      return <p className="empty">Your bag is empty</p>
    }
    return (
      <>
        <div className="cardContentHeadings">
          <h2>ITEM</h2>
          <h2>QTY</h2>
        </div>
        {itemsToRender.map((item, index) => (
          <article key={index}>
            <BagItemCard item={item} />
          </article>
        ))}
      </>
    )
  }

  const renderOrderSummary = bagContext => {
    const items = [...bagContext.itemsInBag]

    if (items.length === 0) {
      return
    }
    return (
      <div>
        <article>
          <OrderSummary />
        </article>
        <div className="buttonContainer">
          <Link to="/checkout" className="checkoutLink">
            CHECKOUT
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <section>
        <div className="bag">
          <div className="heading">
            <h2>SHOPPING BAG</h2>
          </div>
          <div className="content">
            <div className="contentBlock">
              <BagContext.Consumer>
                {value => renderItems([...value.itemsInBag])}
              </BagContext.Consumer>
            </div>
            <BagContext.Consumer>
              {value => renderOrderSummary(value)}
            </BagContext.Consumer>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Bag

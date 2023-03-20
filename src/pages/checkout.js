import React from "react"
import Layout from "../components/Layout"
import { container, heading, content } from "../styles/checkout.module.css"

const Checkout = () => {
  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>CHECKOUT</h2>
        </div>
        <div className={content}></div>
      </div>
    </Layout>
  )
}

export default Checkout

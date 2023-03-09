import React, { useState, useEffect } from "react"
import {
  orderSummaryContainer,
  content,
  borderBottom,
  heading,
  dataCell,
  detail,
  leftSide,
  rightSide,
} from "../styles/order-summary.module.css"
import { BagContext } from "./BagContextComponent"

const OrderSummary = () => {
  const shipping = (20).toFixed(2)

  const add = (num, bagContext) => {
    const numA = parseInt(num)
    const numB = parseInt(bagContext.itemsTotal)

    return `$${(numA + numB).toFixed(2)}`
  }

  const renderOrderSummary = bagContext => {
    return bagContext.itemsTotal > 0 ? (
      <div className={content}>
        <table>
          <tbody>
            <tr className={borderBottom}>
              <td className={`${dataCell} ${heading} ${leftSide}`}>
                <h2>ORDER SUMMARY</h2>
              </td>
              <td className={`${dataCell} ${heading} ${rightSide}`}>
                <h2>{bagContext.itemCount} ITEM(S)</h2>
              </td>
            </tr>
            <tr>
              <td className={`${dataCell} ${detail} ${leftSide}`}>
                ITEM SUBTOTAL
              </td>
              <td className={`${dataCell} ${detail} ${rightSide}`}>
                ${bagContext.itemsTotal}
              </td>
            </tr>
            <tr>
              <td className={`${dataCell} ${detail} ${leftSide}`}>SHIPPING</td>
              <td className={`${dataCell} ${detail} ${rightSide}`}>
                ${shipping}
              </td>
            </tr>
            <tr className={borderBottom}>
              <td className={`${dataCell} ${detail} ${leftSide}`}>SUBTOTAL</td>
              <td className={`${dataCell} ${detail} ${rightSide}`}>
                {add(shipping, bagContext)}
              </td>
            </tr>
            <tr className={borderBottom}>
              <td className={`${dataCell} ${detail} ${leftSide}`}>
                ORDER TOTAL
              </td>
              <td className={`${dataCell} ${detail} ${rightSide}`}>
                {add(shipping, bagContext)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : null
  }
  return (
    <div className={orderSummaryContainer}>
      <BagContext.Consumer>
        {value => renderOrderSummary(value)}
      </BagContext.Consumer>
    </div>
  )
}

export default OrderSummary

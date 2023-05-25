import React from "react"
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
      <div className="content">
        <table>
          <tbody>
            <tr className="borderBottom">
              <td className="dataCell heading left">
                <h2>ORDER SUMMARY</h2>
              </td>
              <td className="dataCell heading right">
                <h2>{bagContext.itemCount} ITEM(S)</h2>
              </td>
            </tr>
            <tr>
              <td className="dataCell detail left">ITEM SUBTOTAL</td>
              <td className="dataCell detail right">
                ${bagContext.itemsTotal}
              </td>
            </tr>
            <tr>
              <td className="dataCell detail left">SHIPPING</td>
              <td className="dataCell detail right">${shipping}</td>
            </tr>
            <tr className="borderBottom">
              <td className="dataCell detail left">SUBTOTAL</td>
              <td className="dataCell detail right">
                {add(shipping, bagContext)}
              </td>
            </tr>
            <tr className="borderBottom">
              <td className="dataCell detail left">ORDER TOTAL</td>
              <td className="dataCell detail right">
                {add(shipping, bagContext)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : null
  }
  return (
    <div className="orderSummary">
      <BagContext.Consumer>
        {value => renderOrderSummary(value)}
      </BagContext.Consumer>
    </div>
  )
}

export default OrderSummary

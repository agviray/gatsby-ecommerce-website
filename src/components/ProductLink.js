import React from "react"
import { Link } from "gatsby"

const ProductLink = ({ children, name, price, to }) => {
  return (
    <div className="productLink">
      <Link to={to}>
        <div>
          <div>{children}</div>
          <div className="caption">
            <div className="productName">{name}</div>
            <div className="productPrice">{price}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductLink

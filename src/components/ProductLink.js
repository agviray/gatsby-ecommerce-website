import React from "react"
import { Link } from "gatsby"
import {
  container,
  linkContents,
  imageWrapper,
  caption,
  productName,
  productPrice,
} from "../styles/product-link.module.css"

const ProductLink = ({ children, name, price, to }) => {
  return (
    <div className={container}>
      <Link to={to}>
        <div className={linkContents}>
          <div className={imageWrapper}>{children}</div>
          <div className={caption}>
            <div className={productName}>{name}</div>
            <div className={productPrice}>{price}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductLink

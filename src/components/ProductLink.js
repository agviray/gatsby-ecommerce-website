import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

const ProductLink = ({ children, name, price, to }) => {
  return (
    <div className="container">
      <Link to={to}>
        <div className="image">{children}</div>
        <div className="caption">
          <h3>{name}</h3>
          <span>{price}</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductLink

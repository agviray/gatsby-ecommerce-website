import React from "react"

const ProductLink = ({ children, name, price }) => {
  return (
    <div className="container">
      <a href="#">
        <div className="image">{children}</div>
        <div className="caption">
          <h3>{name}</h3>
          <span>{price}</span>
        </div>
      </a>
    </div>
  )
}

export default ProductLink

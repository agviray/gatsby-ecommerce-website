import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import {
  container,
  itemContainer,
  imageContainer,
  detail,
  leftDetail,
  rightDetail,
  quantity,
  minusButton,
  plusButton,
} from "../styles/bag-item-card.module.css"

const BagItemCard = ({ item }) => {
  console.log(item)
  return (
    <div className={container}>
      <div className={itemContainer}>
        <div className={imageContainer}>
          <img src={item.image.images.fallback.src} alt={item.name} />
        </div>
        <div className={detail}>
          <div className={leftDetail}>
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <p>Price: {item.price}</p>
          </div>
          <div className={rightDetail}>
            <div className={quantity}>
              <span className={minusButton}>-</span>
              <span>{item.quantity}</span>
              <span className={plusButton}>+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BagItemCard

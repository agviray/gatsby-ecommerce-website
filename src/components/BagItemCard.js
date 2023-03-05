import React from "react"
import {
  container,
  itemContainer,
  imageContainer,
  detail,
  leftDetail,
  rightDetail,
} from "../styles/bag-item-card.module.css"
import QuantityEditor from "./QuantityEditor"

const BagItemCard = ({ item }) => {
  // console.log(item)
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
            <QuantityEditor item={item} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BagItemCard

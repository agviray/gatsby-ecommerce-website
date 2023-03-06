import React from "react"
import { Link } from "gatsby"
import {
  container,
  itemContainer,
  imageContainer,
  detail,
  leftDetail,
  rightDetail,
  itemLink,
} from "../styles/bag-item-card.module.css"
import QuantityEditor from "./QuantityEditor"

const BagItemCard = ({ item }) => {
  return (
    <div className={container}>
      <div className={itemContainer}>
        <div className={imageContainer}>
          <Link
            className={itemLink}
            to={`/${item.department}/${item.type}/${item.slug}`}
          >
            <img src={item.image.images.fallback.src} alt={item.name} />
          </Link>
        </div>
        <div className={detail}>
          <div className={leftDetail}>
            <h3>
              <Link
                className={itemLink}
                to={`/${item.department}/${item.type}/${item.slug}`}
              >
                {item.name}
              </Link>
            </h3>
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

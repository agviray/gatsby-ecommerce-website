import React from "react"
import { Link } from "gatsby"
import QuantityEditor from "./QuantityEditor"

const BagItemCard = ({ item }) => {
  return (
    <div className="bagItemCard">
      <div className="item">
        <div className="imgContainer">
          <Link
            className="link"
            to={`/${item.department}/${item.type}/${item.slug}`}
          >
            <figure>
              <img src={item.image.images.fallback.src} alt={item.name} />
            </figure>
          </Link>
        </div>
        <div className="detail">
          <div className="left">
            <h3>
              <Link
                className="link"
                to={`/${item.department}/${item.type}/${item.slug}`}
              >
                {item.name}
              </Link>
            </h3>
            <p>Size: {item.size}</p>
            <p>Price: {item.price}</p>
          </div>
          <div className="right">
            <QuantityEditor item={item} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BagItemCard

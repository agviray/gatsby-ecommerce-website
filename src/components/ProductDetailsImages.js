import React, { useState, useEffect } from "react"
import {
  container,
  content,
  thumbnailCollection,
  thumbnail,
  mainImage,
} from "../styles/product-details-images.module.css"

const ProductDetailsImages = ({ allProductImages }) => {
  const [viewedImage, setViewedImage] = useState(allProductImages[0])

  const renderThumbnails = images => {
    const thumbnails = images.filter(
      image => image.imageNumber !== viewedImage.imageNumber
    )
    return thumbnails.map((image, index) => (
      <div key={index} className={thumbnail}>
        {image.content()}
      </div>
    ))
  }

  return (
    <div className={container}>
      <div className={content}>
        <div className={thumbnailCollection}>
          {renderThumbnails(allProductImages)}
        </div>
        <div className={mainImage}>
          <div className={thumbnail}>{viewedImage.content()}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsImages

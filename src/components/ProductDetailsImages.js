import React, { useState, useEffect } from "react"
import {
  container,
  content,
  imagesContainer,
  imagesContent,
  productImage,
  mainImage,
} from "../styles/product-details-images.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const ProductDetailsImages = ({ allProductImages }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [viewedImage, setViewedImage] = useState(allProductImages[0])
  const windowDimensions = useWindowDimensions()

  return (
    <div className={container}>
      <div className={content}>
        <div className={imagesContainer}>
          <div
            className={imagesContent}
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {allProductImages.map((image, index) => (
              <div key={index} className={productImage}>
                {image.content()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsImages

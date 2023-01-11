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
  const [viewedImage, setViewedImage] = useState(allProductImages[0])
  const windowDimensions = useWindowDimensions()

  // const renderThumbnails = images => {
  //   const thumbnails = images.filter(
  //     image => image.imageNumber !== viewedImage.imageNumber
  //   )
  //   return thumbnails.map((image, index) => (
  //     <div key={index} className={productImage}>
  //       {image.content()}
  //     </div>
  //   ))
  // }

  return (
    <div className={container}>
      <div className={content}>
        <div className={imagesContainer}>
          <div className={imagesContent}>
            {allProductImages.map((image, index) => (
              <div key={index} className={productImage}>{image.content()}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsImages

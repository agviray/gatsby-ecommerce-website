import React, { useState, useEffect } from "react"
import {
  container,
  content,
  carousel,
  carouselContent,
  carouselControls,
  controlsContent,
  control,
  disabledControl,
  previous,
  next,
  productImage,
  mainImage,
} from "../styles/product-details-images.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const ProductDetailsImages = ({ allProductImages }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [viewedImage, setViewedImage] = useState(allProductImages[0])
  const windowDimensions = useWindowDimensions()

  const updateActiveImageIndex = newIndex => {
    console.log("A control was clicked!")
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= allProductImages.length) {
      newIndex = allProductImages.length - 1
    }
    setActiveImageIndex(newIndex)
  }

  const renderMobileView = () => {
    return (
      <div className={carousel}>
        <div
          className={carouselContent}
          style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
        >
          {allProductImages.map((image, index) => (
            <div key={index} className={productImage}>
              {image.content()}
            </div>
          ))}
        </div>
        <div className={carouselControls}>
          <div className={controlsContent}>
            <div
              onClick={() => updateActiveImageIndex(activeImageIndex - 1)}
              className={`${control} ${
                activeImageIndex <= 0 ? `${disabledControl}` : ""
              }`}
            >
              <span className={previous}></span>
            </div>
            <div
              onClick={() => updateActiveImageIndex(activeImageIndex + 1)}
              className={`${control} ${
                activeImageIndex >= allProductImages.length - 1
                  ? `${disabledControl}`
                  : ""
              }`}
            >
              <span className={next}></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={container}>
      <div className={content}>{renderMobileView()}</div>
    </div>
  )
}

export default ProductDetailsImages

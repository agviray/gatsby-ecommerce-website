import React, { useState } from "react"
import {
  container,
  content,
  carousel,
  carouselContent,
  carouselItems,
  carouselControls,
  controlsContent,
  productImage,
  control,
  disabledControl,
  previous,
  next,
  tracker,
  trackerContent,
  currentTracked,
  trackerLine,
  allTracked,
  sidePanel,
  sidePanelContent,
  panelItem,
  panelItemSelected,
} from "../styles/product-details-images.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const ProductDetailsImages = ({ allProductImages }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const windowDimensions = useWindowDimensions()

  const updateActiveImageIndex = newIndex => {
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
        <div className={carouselContent}>
          <div
            className={carouselItems}
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
            <div className={tracker}>
              <div className={trackerContent}>
                <span className={currentTracked}>{activeImageIndex + 1}</span>
                <span className={trackerLine}>|</span>
                <span className={allTracked}>{allProductImages.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSidePanel = () => {
    return (
      <div className={sidePanel}>
        <div className={sidePanelContent}>
          {allProductImages.map((image, index) => (
            <div
              key={index}
              className={`${panelItem} ${
                activeImageIndex === index ? `${panelItemSelected}` : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              {image.content()}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={container}>
      <div className={content}>
        {windowDimensions.width >= 800 ? renderSidePanel() : null}
        {renderMobileView()}
      </div>
    </div>
  )
}

export default ProductDetailsImages

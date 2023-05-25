import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeHomeGoodsSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-home-goods-mobile.jpg"
  const desktopImage = "../departments/images/home-home-goods-desktop.jpg"

  const renderedMobileImage = (
    <figure>
      <StaticImage
        className="mobileStaticImage"
        src={mobileImage}
        alt="red chair sitting in nature"
        placeholder="blurred"
        objectFit="cover"
        objectPosition={"top"}
      />
    </figure>
  )

  const renderedDesktopImage = (
    <figure>
      <StaticImage
        className={`${
          windowDimensions.width < 800 &&
          windowDimensions.width > windowDimensions.height
            ? "mobileStaticImage"
            : ""
        }`}
        src={desktopImage}
        alt="red chair sitting in nature"
        placeholder="blurred"
        layout="fullWidth"
      />
    </figure>
  )

  const showMobileImage = () => {
    return windowDimensions.width < windowDimensions.height
      ? renderedMobileImage
      : renderedDesktopImage
  }

  return (
    <div className="homeHomeGoodsSection">
      {windowDimensions.width < 800 ? (
        <>{showMobileImage()}</>
      ) : (
        <>{renderedDesktopImage}</>
      )}
    </div>
  )
}

export default HomeHomeGoodsSection

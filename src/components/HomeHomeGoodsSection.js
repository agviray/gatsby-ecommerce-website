import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  mobileStaticImage,
} from "../styles/home-home-goods-section.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeHomeGoodsSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-home-goods-mobile.jpg"
  const desktopImage = "../departments/images/home-home-goods-desktop.jpg"

  const renderedMobileImage = (
    <>
      <StaticImage
        className={mobileStaticImage}
        src={mobileImage}
        alt="red chair sitting in nature"
        placeholder="blurred"
        objectFit="cover"
        objectPosition={"top"}
      />
    </>
  )

  const renderedDesktopImage = (
    <>
      <StaticImage
        className={`${
          windowDimensions.width < 800 &&
          windowDimensions.width > windowDimensions.height
            ? mobileStaticImage
            : null
        }`}
        src={desktopImage}
        alt="red chair sitting in nature"
        placeholder="blurred"
        layout="fullWidth"
      />
    </>
  )

  const showMobileImage = () => {
    return windowDimensions.width < windowDimensions.height
      ? renderedMobileImage
      : renderedDesktopImage
  }

  return (
    <div className={sectionContent}>
      {windowDimensions.width < 800 ? (
        <>{showMobileImage()}</>
      ) : (
        <>{renderedDesktopImage}</>
      )}
    </div>
  )
}

export default HomeHomeGoodsSection

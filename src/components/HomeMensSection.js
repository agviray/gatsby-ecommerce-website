import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  mobileStaticImage,
} from "../styles/home-mens-section.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeMensSection = () => {
  const windowDimensions = useWindowDimensions()
  const mobileImage = "../departments/images/home-mens-mobile.jpg"
  const desktopImage = "../departments/images/home-mens-desktop-collage.png"

  const renderedMobileImage = (
    <>
      <StaticImage
        className={mobileStaticImage}
        src={mobileImage}
        alt="man posing"
        placeholder="blurred"
        objectFit="cover"
        objectPosition="top"
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
        alt="collage of men posing"
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

export default HomeMensSection

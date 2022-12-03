import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  mobileStaticImage,
  desktopImageContainer,
} from "../styles/home-gifts-section.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeGiftsSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-gifts-mobile.jpg"
  const mobileLandscapeImage =
    "../departments/images/home-gifts-mobile-landscape-image.png"
  const desktopImage = "../departments/images/home-gifts-collage.png"

  const renderedMobileImage = (
    <>
      <StaticImage
        className={mobileStaticImage}
        src={mobileImage}
        alt={"white handbag"}
        objectFit="cover"
        objectPosition={"top"}
      />
    </>
  )

  const renderedMobileLandscapeImage = (
    <>
      <StaticImage
        className={mobileStaticImage}
        src={mobileLandscapeImage}
        alt={"woman holding handbag and man posing"}
        placeholder="blurred"
        layout="fullWidth"
      />
    </>
  )

  const renderedDesktopImage = (
    <>
      <StaticImage
        src={desktopImage}
        alt="collage of people and accessories"
        placeholder="blurred"
        objectFit="cover"
        objectPosition={"50% 50%"}
      />
    </>
  )

  const showMobileImage = () => {
    return windowDimensions.width < windowDimensions.height
      ? renderedMobileImage
      : renderedMobileLandscapeImage
  }

  return (
    <div className={sectionContent}>
      {windowDimensions.width < 800 ? (
        <>{showMobileImage()}</>
      ) : (
        <div className={desktopImageContainer}>{renderedDesktopImage}</div>
      )}
    </div>
  )
}

export default HomeGiftsSection

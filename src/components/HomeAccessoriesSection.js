import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeAccessoriesSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-accessories-mobile.jpg"
  const mobileLandscapeImage =
    "../departments/images/home-accessories-mobile-landscape-image.png"
  const desktopImage = "../departments/images/home-accessories-collage.png"

  const renderedMobileImage = (
    <figure>
      <StaticImage
        className="mobileStaticImage"
        src={mobileImage}
        alt={"white handbag"}
        objectFit="cover"
        objectPosition={"top"}
      />
    </figure>
  )

  const renderedMobileLandscapeImage = (
    <figure>
      <StaticImage
        className="mobileStaticImage"
        src={mobileLandscapeImage}
        alt={"woman holding handbag and man posing"}
        placeholder="blurred"
        layout="fullWidth"
      />
    </figure>
  )

  const renderedDesktopImage = (
    <figure>
      <StaticImage
        src={desktopImage}
        alt="collage of people and accessories"
        placeholder="blurred"
        objectFit="cover"
        objectPosition={"50% 50%"}
      />
    </figure>
  )

  const showMobileImage = () => {
    return windowDimensions.width < windowDimensions.height
      ? renderedMobileImage
      : renderedMobileLandscapeImage
  }

  return (
    <div className="homeAccessoriesSection">
      {windowDimensions.width < 800 ? (
        <>{showMobileImage()}</>
      ) : (
        <div className="desktopImageContainer">{renderedDesktopImage}</div>
      )}
    </div>
  )
}

export default HomeAccessoriesSection

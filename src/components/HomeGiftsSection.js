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
  const desktopImage = "../departments/images/home-gifts-collage.png"

  return (
    <div className={sectionContent}>
      {windowDimensions.width < 800 ? (
        <StaticImage
          className={mobileStaticImage}
          src={mobileImage}
          alt="white handbag"
          placeholder="blurred"
          objectFit="cover"
          objectPosition={"top"}
        />
      ) : (
        <div className={desktopImageContainer}>
          <StaticImage
            src={desktopImage}
            alt="collage of people and accessories"
            placeholder="blurred"
            objectFit="cover"
            objectPosition={"50% 50%"}
          />
        </div>
      )}
    </div>
  )
}

export default HomeGiftsSection

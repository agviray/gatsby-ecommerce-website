import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  imageContainer,
} from "../styles/home-gifts-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeGiftsSection = () => {
  const windowWidth = useWindowWidth()

  const mobileImage = "../departments/images/home-gifts-feat-img-mobile.jpg"
  const desktopImage = "../departments/images/home-gifts-collage03.png"

  return (
    <div className={sectionContent}>
      <div>
        {windowWidth < 800 ? (
          <>
            <StaticImage
              src={mobileImage}
              alt="white handbag"
              placeholder="blurred"
              layout="fullWidth"
            />
          </>
        ) : (
          <div className={imageContainer}>
            <StaticImage
              src={desktopImage}
              alt="collage of people and accessories"
              placeholder="blurred"
              layout="fullWidth"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeGiftsSection

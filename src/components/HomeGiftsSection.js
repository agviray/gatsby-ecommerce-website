import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-gifts-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeGiftsSection = () => {
  const windowWidth = useWindowWidth()

  const mobileImage = "../departments/images/home-gifts-feat-img-mobile.jpg"
  const desktopImage = "../departments/images/home-gifts-collage02.png"

  return (
    <div className={styles.sectionContent}>
      {windowWidth < 800 ? (
        <div>
          <StaticImage
            src={mobileImage}
            alt="white handbag"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      ) : (
        <div>
          <StaticImage
            src={desktopImage}
            alt="collage of people and accessories"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      )}
    </div>
  )
}

export default HomeGiftsSection

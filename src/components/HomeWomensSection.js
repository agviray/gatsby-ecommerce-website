import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-womens-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeWomensSection = () => {
  const windowWidth = useWindowWidth()

  const mobileImage = "../departments/images/home-womens-feat-img-mobile.jpg"
  const desktopImage = "../departments/images/home-womens-section-a-collage.png"

  return (
    <div className={styles.sectionContent}>
      {windowWidth < 800 ? (
        <div>
          <StaticImage
            src={mobileImage}
            alt="woman posing"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      ) : (
        <div className={styles.desktopImageContainer}>
          <StaticImage
            src={desktopImage}
            alt="collage of woman posing"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      )}
    </div>
  )
}

export default HomeWomensSection

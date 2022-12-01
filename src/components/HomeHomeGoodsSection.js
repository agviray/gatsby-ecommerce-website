import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-home-goods-section.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const HomeHomeGoodsSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage =
    "../departments/images/home-home-goods-feat-img-mobile.jpg"
  const desktopImage =
    "../departments/images/home-home-goods-feature-img-desktop.jpg"

  return (
    <div className={styles.sectionContent}>
      {windowDimensions.width < 800 ? (
        <>
          <StaticImage
            src={mobileImage}
            alt="red chair sitting in nature"
            placeholder="blurred"
            layout="fullWidth"
          />
        </>
      ) : (
        <>
          <StaticImage
            src={desktopImage}
            alt="red chair sitting in nature"
            placeholder="blurred"
            layout="fullWidth"
          />
        </>
      )}
    </div>
  )
}

export default HomeHomeGoodsSection

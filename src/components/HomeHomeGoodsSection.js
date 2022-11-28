import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-home-goods-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeHomeGoodsSection = () => {
  const windowWidth = useWindowWidth()

  const mobileImage =
    "../departments/images/home-home-goods-feat-img-mobile.jpg"
  const desktopImage =
    "../departments/images/home-home-goods-feature-img-desktop.jpg"

  return (
    <div className={styles.sectionContent}>
      {windowWidth < 800 ? (
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

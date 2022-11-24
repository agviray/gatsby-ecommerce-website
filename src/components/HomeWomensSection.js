import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  imageAContainer,
  imageBContainer,
  imageCContainer,
} from "../styles/home-womens-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"
import VerticalCarousel from "./VerticalCarousel"

const HomeWomensSection = () => {
  const windowWidth = useWindowWidth()

  const mobileImage = "../departments/images/home-womens-feat-img-mobile.jpg"

  const desktopImageA =
    "../departments/images/home-womens-section-a-collage.png"
  const desktopImageB =
    "../departments/images/home-womens-section-c-collage.png"
  const desktopImageC =
    "../departments/images/home-womens-section-b-collage.png"

  const slides = [
    {
      slideNumber: "Slide #1",
      content: () => (
        <div className={imageAContainer}>
          <StaticImage
            src={desktopImageA}
            alt="Collage of woman posing"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      ),
    },
    {
      slideNumber: "Slide #2",
      content: () => (
        <div className={imageBContainer}>
          <StaticImage
            src={desktopImageB}
            alt="Collage of woman posing"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      ),
    },
    {
      slideNumber: "Slide #3",
      content: () => (
        <div className={imageCContainer}>
          <StaticImage
            src={desktopImageC}
            alt="Collage of woman posing"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      ),
    },
  ]

  return (
    <div className={sectionContent}>
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
        <div>
          <VerticalCarousel allSlides={slides} />
        </div>
      )}
    </div>
  )
}

export default HomeWomensSection

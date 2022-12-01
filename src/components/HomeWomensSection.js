import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  sectionContent,
  mobileStaticImage,
  desktopStaticImage,
} from "../styles/home-womens-section.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"
import VerticalCarousel from "./VerticalCarousel"

const HomeWomensSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-womens-mobile.jpg"
  const desktopImageA = "../departments/images/home-womens-slide01.png"
  const desktopImageB = "../departments/images/home-womens-slide02.png"
  const desktopImageC = "../departments/images/home-womens-slide03.png"

  const slides = [
    {
      slideNumber: "Slide #1",
      content: () => (
        <StaticImage
          className={desktopStaticImage}
          src={desktopImageA}
          alt="Collage of woman posing"
          placeholder="blurred"
          objectFit="contain"
          objectPosition={"50% 50%"}
        />
      ),
    },
    {
      slideNumber: "Slide #2",
      content: () => (
        <StaticImage
          className={desktopStaticImage}
          src={desktopImageB}
          alt="Collage of woman posing"
          placeholder="blurred"
          objectFit="contain"
          objectPosition={"50% 50%"}
        />
      ),
    },
    {
      slideNumber: "Slide #3",
      content: () => (
        <StaticImage
          className={desktopStaticImage}
          src={desktopImageC}
          alt="Collage of woman posing"
          placeholder="blurred"
          objectFit="contain"
          objectPosition={"50% 50%"}
        />
      ),
    },
  ]

  return (
    <div className={sectionContent}>
      {windowDimensions.width < 800 ? (
        <>
          <StaticImage
            className={mobileStaticImage}
            src={mobileImage}
            alt="woman posing"
            placeholder="blurred"
            objectFit="cover"
            objectPosition={"top"}
          />
        </>
      ) : (
        <>
          <VerticalCarousel allSlides={slides} />
        </>
      )}
    </div>
  )
}

export default HomeWomensSection

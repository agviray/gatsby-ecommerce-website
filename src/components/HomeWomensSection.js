import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useWindowDimensions from "./hooks/useWindowDimensions"
import VerticalCarousel from "./VerticalCarousel"

const HomeWomensSection = () => {
  const windowDimensions = useWindowDimensions()

  const mobileImage = "../departments/images/home-womens-mobile.jpg"
  const mobileLandscapeImage =
    "../departments/images/home-womens-mobile-landscape-image.png"
  const desktopImageA = "../departments/images/home-womens-slide01.png"
  const desktopImageB = "../departments/images/home-womens-slide02.png"
  const desktopImageC = "../departments/images/home-womens-slide03.png"

  const slides = [
    {
      slideNumber: "Slide #1",
      content: () => (
        <StaticImage
          className="desktopStaticImage"
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
          className="desktopStaticImage"
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
          className="desktopStaticImage"
          src={desktopImageC}
          alt="Collage of woman posing"
          placeholder="blurred"
          objectFit="contain"
          objectPosition={"50% 50%"}
        />
      ),
    },
  ]

  const renderedDesktopContent = (
    <>
      <VerticalCarousel allSlides={slides} />
    </>
  )

  const renderedMobileImage = (
    <>
      <StaticImage
        className="mobileStaticImage"
        src={mobileImage}
        alt="woman posing"
        placeholder="blurred"
        objectFit="cover"
        objectPosition={"top"}
      />
    </>
  )

  const renderedMobileLandscapeImage = (
    <StaticImage
      className="mobileStaticImage"
      src={mobileLandscapeImage}
      alt="woman posing"
      placeholder="blurred"
      layout="fullWidth"
    />
  )

  const showMobileImage = () => {
    return windowDimensions.width < windowDimensions.height
      ? renderedMobileImage
      : renderedMobileLandscapeImage
  }

  return (
    <div className="homeWomensSection">
      {windowDimensions.width < 800 ? (
        <>{showMobileImage()}</>
      ) : (
        <div className="desktopStaticImageWrapper">
          <StaticImage
            className="desktopStaticImage"
            src={desktopImageA}
            alt="Collage of woman posing"
            placeholder="blurred"
            objectFit="contain"
            objectPosition={"50% 50%"}
          />
        </div>
      )}
    </div>
  )
}

export default HomeWomensSection

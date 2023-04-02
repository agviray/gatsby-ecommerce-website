import React, { useState, useEffect, useRef } from "react"
import {
  slidesContainer,
  slides,
  slide,
  transition,
} from "../styles/vertical-carousel.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const VerticalCarousel = ({ allSlides }) => {
  const [visibleSlide, setVisibleSlide] = useState(1)
  const [hasTransitionClass, setHasTransitionClass] = useState(true)
  const [stateSlides, setStateSlides] = useState(allSlides)
  const [slideDimensions, setSlideDimensions] = useState({
    width: null,
    height: null,
  })
  const slideContainerRef = useRef(null)
  const windowDimensions = useWindowDimensions()
  const intervalId = useRef(null)

  // *** Creates clones of the first and last slide. ***
  // - Clone of first slide is pushed to the end of the "real slides".
  // - Clone of last slide is set to the front of the "real slides".
  useEffect(() => {
    const slidesWithClones = [...allSlides]
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
    slidesWithClones.push(slidesWithClones[1])
    setStateSlides(slidesWithClones)
  }, [])

  // *** Starts the automatic cycling of the carousel. ***
  useEffect(() => {
    const cycleSpeed = 5000

    const startCarouselCycling = () => {
      if (intervalId.current !== null) {
        return
      }
      intervalId.current = setInterval(() => {
        setVisibleSlide(prevVisibleSlide => {
          if (prevVisibleSlide + 1 === stateSlides.length) {
            return 0
          }
          return prevVisibleSlide + 1
        })
      }, cycleSpeed)
    }

    if (stateSlides.length === 5) {
      startCarouselCycling()
    }
  }, [stateSlides])

  // *** Maintains the 'infinite scroll' illusion when sliding between each slide. ***
  useEffect(() => {
    const transitionSpeed = 500
    if (visibleSlide === stateSlides.length - 1) {
      setTimeout(() => {
        setHasTransitionClass(false)
        setVisibleSlide(1)
      }, transitionSpeed)
    }

    if (visibleSlide === 1) {
      setTimeout(() => {
        setHasTransitionClass(true)
      }, transitionSpeed)
    }

    if (visibleSlide === 0) {
      setTimeout(() => {
        setHasTransitionClass(false)
        setVisibleSlide(stateSlides.length - 2)
      }, transitionSpeed)
    }

    if (visibleSlide === stateSlides.length - 2) {
      setTimeout(() => {
        setHasTransitionClass(true)
      }, transitionSpeed)
    }
  }, [visibleSlide])

  // *** Resets the dimensions of the the slides whenever the window width changes. ***
  // - Each slide's dimensions are based on the dimensions of each image
  //   within the slides.
  // - Therefore, it is important that the content of each slide has the same dimenions.
  useEffect(() => {
    if (slideContainerRef.current) {
      setSlideDimensions({
        width:
          slideContainerRef.current.childNodes[0].childNodes[0].offsetWidth,
        height:
          slideContainerRef.current.childNodes[0].childNodes[0].offsetHeight,
      })
    }
  }, [windowDimensions])

  useEffect(() => {
    if (slideDimensions.height === 0) {
      window.location.reload(false)
    }
  }, [slideDimensions])

  // *** Determines the "window" height of the slides. ***
  // - The "window" created by this style is what enables only the
  //   visibleSlide to be shown. (Otherwise, we would see the other
  //   slides/images overflowing).
  // - Only the height is applied, because we are scrolling vertically.
  const applySlideDimensionStyles = () => {
    return {
      height: `${slideDimensions.height}px`,
    }
  }

  // *** Determines the css selector "top" property value. ***
  // - The returned value is applied to the "top" css property value.
  // - The "top" value is adjusted accordingly to apply the "sliding"
  //   transition to the next visibleSlide.
  const calculateTopMargin = () => {
    return `-${visibleSlide * slideDimensions.height}px`
  }

  return (
    <>
      <div className={slidesContainer} style={applySlideDimensionStyles()}>
        <div
          className={`${slides} ${hasTransitionClass ? `${transition}` : ""}`}
          style={{ top: calculateTopMargin() }}
        >
          {stateSlides.map((stateSlide, index) => (
            <div
              key={index}
              ref={index === 0 ? slideContainerRef : null}
              className={slide}
              style={applySlideDimensionStyles()}
            >
              <figure>{stateSlide.content()}</figure>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default VerticalCarousel

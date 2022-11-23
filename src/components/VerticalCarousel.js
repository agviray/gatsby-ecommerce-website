import React, { useState, useEffect, useRef } from "react"
import {
  container,
  slidesContainer,
  slides,
  slide,
  transition,
  buttonContainer,
  button,
  start,
} from "../styles/vertical-carousel.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const VerticalCarousel = ({ allSlides, autoCycle }) => {
  const [visibleSlide, setVisibleSlide] = useState(1)
  const [hasTransitionClass, setHasTransitionClass] = useState(true)
  const [stateSlides, setStateSlides] = useState(allSlides)
  const [slideDimensions, setSlideDimensions] = useState({
    width: null,
    height: null,
  })
  const slideContainerRef = useRef(null)
  const windowWidth = useWindowWidth()
  const intervalId = useRef(null)

  useEffect(() => {
    const slidesWithClones = [...allSlides]
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
    slidesWithClones.push(slidesWithClones[1])
    setStateSlides(slidesWithClones)
  }, [])

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

    if (stateSlides.length === 3) {
      return
    } else {
      startCarouselCycling()
    }
  }, [stateSlides])

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

  //
  useEffect(() => {
    if (slideContainerRef.current) {
      setSlideDimensions({
        width:
          slideContainerRef.current.childNodes[0].childNodes[0].offsetWidth,
        height:
          slideContainerRef.current.childNodes[0].childNodes[0].offsetHeight,
      })
    }
  }, [windowWidth])

  const applySlideDimensionStyles = () => {
    return {
      height: `${slideDimensions.height}px`,
    }
  }

  const calculateTopMargin = () => {
    return `-${visibleSlide * slideDimensions.height}px`
  }

  return (
    <>
      <div className={container}>
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
                {stateSlide.content()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default VerticalCarousel

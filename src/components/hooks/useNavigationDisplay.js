import { useState, useEffect } from "react"

const useNavigationDisplay = isMenuOpen => {
  const navigationHeight = 99
  const [previousScrollY, setPreviousScrollY] = useState(0)
  const [showNavigation, setShowNavigation] = useState(true)

  useEffect(() => {
    const changePreviousScrollY = () => {
      let currentScrollYPos = window.scrollY
      if (typeof window !== "undefined") {
        if (isMenuOpen) {
          return
        }

        if (currentScrollYPos < navigationHeight) {
          setShowNavigation(true)
          setPreviousScrollY(currentScrollYPos)
          return
        }

        if (currentScrollYPos < previousScrollY) {
          setShowNavigation(true)
        } else if (currentScrollYPos > previousScrollY) {
          setShowNavigation(false)
        }
        setPreviousScrollY(currentScrollYPos)
      }
    }

    window.addEventListener("scroll", changePreviousScrollY)

    if (isMenuOpen === true) {
      window.removeEventListener("scroll", changePreviousScrollY)
      return
    }

    return () => {
      window.removeEventListener("scroll", changePreviousScrollY)
    }
  }, [previousScrollY, isMenuOpen])

  return showNavigation
}

export default useNavigationDisplay

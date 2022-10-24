// - Custom hook to return the current width of the window.
import { useState, useEffect } from "react"

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [width])

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  return width
}

export default useWindowWidth

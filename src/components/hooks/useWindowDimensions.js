import { useState, useEffect } from "react"

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [dimensions])

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  return dimensions
}

export default useWindowDimensions

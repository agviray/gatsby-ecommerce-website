import { useState, useEffect } from "react"

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({})

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"

    if (isBrowser) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  return dimensions
}

export default useWindowDimensions

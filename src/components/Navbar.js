import React, { useState, useEffect, useRef } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import * as styles from "../styles/navbar.module.css"
import NavMenu from "./NavMenu"
import useWindowWidth from "../components/hooks/useWindowWidth"
import Hamburger from "./Hamburger"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navContainerRef = useRef(null)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    const handleBodyClicked = e => {
      if (navContainerRef.current.contains(e.target)) {
        return
      }
      setIsMenuOpen(false)
    }

    document.body.addEventListener("click", handleBodyClicked)

    return () => {
      document.body.removeEventListener("click", handleBodyClicked)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    }

    if (!isMenuOpen) {
      document.body.style.overflow = "visible"
    }
  }, [isMenuOpen])

  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // - Any property of siteMetadata--ie, title--was specified in
  //   the gatsby-config.js file.
  const { title } = data.site.siteMetadata

  const updateIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderNav = () => {
    return (
      <nav>
        <span>
          <Link to={"/"}>
            <h1>{title}</h1>
          </Link>
        </span>
        {windowWidth < 800 ? (
          <Hamburger
            isMenuOpen={isMenuOpen}
            onIsMenuOpenChange={updateIsMenuOpen}
          />
        ) : null}
        <NavMenu isMenuOpen={isMenuOpen} />
      </nav>
    )
  }

  return (
    <div ref={navContainerRef} className={styles.container}>
      {renderNav()}
    </div>
  )
}

export default Navbar

import React, { useState, useEffect, useRef } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import * as styles from "../styles/navbar.module.css"
import NavMenu from "./NavMenu"
import Hamburger from "./Hamburger"
import useWindowWidth from "../components/hooks/useWindowWidth"
import useNavigationDisplay from "./hooks/useNavigationDisplay"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navContainerRef = useRef(null)
  const windowWidth = useWindowWidth()
  const isNavbarDisplayed = useNavigationDisplay()

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
  {
  }
  return (
    <div
      ref={navContainerRef}
      className={`${styles.container} ${
        isNavbarDisplayed ? `` : `${styles.notDisplayed}`
      }`}
    >
      {renderNav()}
      <div
        className={`${styles.overlay} ${
          isMenuOpen ? `${styles.overlayActive}` : ``
        }`}
        onClick={updateIsMenuOpen}
      ></div>
    </div>
  )
}

export default Navbar

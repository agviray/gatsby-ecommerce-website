import React, { useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import * as styles from "../styles/navbar.module.css"
import NavMenu from "./NavMenu"
import useWindowWidth from "../components/hooks/useWindowWidth"
import Hamburger from "./Hamburger"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const windowWidth = useWindowWidth()

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
          <Hamburger onIsMenuOpenChange={updateIsMenuOpen} />
        ) : null}
        <NavMenu isMenuOpen={isMenuOpen} />
      </nav>
    )
  }

  return <div className="navbar">{renderNav()}</div>
}

export default Navbar

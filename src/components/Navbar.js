import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import * as styles from "../styles/navbar.module.css"
import NavMenu from "./NavMenu"

export default function Navbar() {
  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // - Any property of siteMetadata--ie, title--was specified in the gatsby-config.js file.
  const { title } = data.site.siteMetadata

  const renderNav = () => {
    return (
      <nav>
        <span>
          <Link to={"/"}>
            <h1>{title}</h1>
          </Link>
        </span>
        <NavMenu />
      </nav>
    )
  }

  return <div className="navbar">{renderNav()}</div>
}

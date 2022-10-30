import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "./Navbar"
import "../styles/global.css"

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query LayoutComponent {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <p>Copyright &copy; 2022 {title}</p>
      </footer>
    </div>
  )
}

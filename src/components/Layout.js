import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "./Navbar"
import FooterContent from "./FooterContent"
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
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <FooterContent title={title} />
      </footer>
    </div>
  )
}

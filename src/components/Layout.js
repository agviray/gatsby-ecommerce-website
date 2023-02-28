import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "./Navbar"
import FooterContent from "./FooterContent"
import BagContextProvider from "./BagContextComponent"
import "../styles/global.css"

const Layout = ({ children }) => {
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
    <BagContextProvider>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <FooterContent title={title} />
      </footer>
    </BagContextProvider>
  )
}

export default Layout

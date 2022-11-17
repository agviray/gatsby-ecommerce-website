import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"
import HomeWomensSection from "../components/HomeWomensSection"
import HomeMensSection from "../components/HomeMensSection"
import HomeHomeGoodsSection from "../components/HomeHomeGoodsSection"

export default function Home({ data }) {
  const image = getImage(data.image.childImageSharp)
  // console.log(data)
  return (
    <Layout>
      <section>
        <HomeWomensSection />
      </section>
      <section>
        <HomeMensSection />
      </section>
      <section>
        <HomeHomeGoodsSection />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    image: file(relativePath: { eq: "items-group01.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`

import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"

export default function Home({ data }) {
  const image = getImage(data.image.childImageSharp)
  // console.log(data)
  return (
    <Layout>
      <section className={styles.header}>
        <div>
          <h2>Official Online Store</h2>
          <span>Welcome to the shop!</span>
        </div>
      </section>
      <GatsbyImage image={image} alt="items group" />
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

import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from "../styles/category-details.module.css"

export default function CategoryDetails({ data }) {
  const { html } = data.markdownRemark
  const { title, description, featuredImg } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <div className={styles.featured}>
          <GatsbyImage
            image={featuredImg.childImageSharp.gatsbyImageData}
            alt={"page banner"}
          />
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CategoryDetailsPage($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        featuredImg {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              formats: [AUTO, WEBP]
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`

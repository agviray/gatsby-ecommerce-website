import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-mens-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeMensSection = () => {
  const windowWidth = useWindowWidth()

  const data = useStaticQuery(graphql`
    query HomeMensSectionComponent {
      markdownRemark(frontmatter: { slug: { eq: "mens" } }) {
        frontmatter {
          mobileImage {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
          desktopImage {
            childImageSharp {
              id
              gatsbyImageData(
                formats: [AUTO, WEBP]
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
  `)

  const mobileImage =
    data.markdownRemark.frontmatter.mobileImage.childImageSharp.gatsbyImageData
  const desktopImage =
    data.markdownRemark.frontmatter.desktopImage.childImageSharp.gatsbyImageData

  return (
    <div className={styles.sectionContent}>
      {windowWidth < 800 ? (
        <div>
          <GatsbyImage image={mobileImage} alt="man posing" />
        </div>
      ) : (
        <div>
          <GatsbyImage image={desktopImage} alt="men closeup collage" />
        </div>
      )}
    </div>
  )
}

export default HomeMensSection

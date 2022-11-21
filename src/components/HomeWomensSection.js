import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-womens-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeWomensSection = () => {
  const windowWidth = useWindowWidth()

  const data = useStaticQuery(graphql`
    query HomeWomensSectionComponent {
      markdownRemark(frontmatter: { slug: { eq: "womens" } }) {
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
          desktopImageA {
            childImageSharp {
              id
              gatsbyImageData(
                layout: FULL_WIDTH
                formats: [AUTO, WEBP]
                placeholder: BLURRED
              )
            }
          }
          desktopImageB {
            childImageSharp {
              id
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
  `)

  const mobileImage =
    data.markdownRemark.frontmatter.mobileImage.childImageSharp.gatsbyImageData
  const desktopImageA =
    data.markdownRemark.frontmatter.desktopImageA.childImageSharp
      .gatsbyImageData
  const desktopImageB =
    data.markdownRemark.frontmatter.desktopImageB.childImageSharp
      .gatsbyImageData

  return (
    <div className={styles.sectionContent}>
      {windowWidth < 800 ? (
        <div>
          <GatsbyImage image={mobileImage} alt="woman posing" />
        </div>
      ) : (
        <div className={styles.desktopImageContainer}>
          <GatsbyImage image={desktopImageA} alt="collage of images" />
        </div>
      )}
    </div>
  )
}

export default HomeWomensSection

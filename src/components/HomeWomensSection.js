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
          desktopImage {
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
  const desktopImage =
    data.markdownRemark.frontmatter.desktopImage.childImageSharp.gatsbyImageData

  return (
    <>
      {windowWidth < 800 ? (
        <div>
          <GatsbyImage image={mobileImage} alt="woman posing" />
        </div>
      ) : (
        <div className={styles.desktopImageContainer}>
          <GatsbyImage image={desktopImage} alt="collage of images" />
        </div>
      )}
    </>
  )
}

export default HomeWomensSection

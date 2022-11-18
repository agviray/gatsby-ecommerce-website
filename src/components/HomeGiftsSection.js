import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-gifts-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeGiftsSection = () => {
  const windowWidth = useWindowWidth()

  const data = useStaticQuery(graphql`
    query GiftsSectionComponent {
      markdownRemark(frontmatter: { slug: { eq: "gifts" } }) {
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
          <GatsbyImage image={mobileImage} alt="white purse" />
        </div>
      ) : (
        <div>
          <GatsbyImage image={desktopImage} alt="collage of images" />
        </div>
      )}
    </div>
  )
}

export default HomeGiftsSection

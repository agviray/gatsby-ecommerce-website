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
          mainImageMobile {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
          supportImages {
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
    data.markdownRemark.frontmatter.mainImageMobile.childImageSharp
      .gatsbyImageData
  const desktopImages = [...data.markdownRemark.frontmatter.supportImages]

  const renderDesktopContent = () => {
    return (
      <div className={styles.supportImagesContainer}>
        <div className={styles.supportContainer}>
          <GatsbyImage image={mobileImage} alt="man posing" />
        </div>
        {desktopImages.map(img => {
          return (
            <div
              key={img.childImageSharp.id}
              className={styles.supportContainer}
            >
              <GatsbyImage
                image={img.childImageSharp.gatsbyImageData}
                alt="man posing"
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {windowWidth < 800 ? (
        <div>
          <GatsbyImage image={mobileImage} alt="man posing" />
        </div>
      ) : (
        renderDesktopContent()
      )}
    </>
  )
}

export default HomeMensSection

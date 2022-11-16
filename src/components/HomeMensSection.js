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

  const { mainImageMobile } = data.markdownRemark.frontmatter
  const { supportImages } = data.markdownRemark.frontmatter

  const renderDesktopContent = () => {
    return (
      <div className={styles.supportImagesContainer}>
        <div className={styles.supportContainer}>
          <GatsbyImage
            image={mainImageMobile.childImageSharp.gatsbyImageData}
            alt="man posing"
          />
        </div>
        <div className={styles.supportContainer}>
          <GatsbyImage
            image={supportImages[0].childImageSharp.gatsbyImageData}
            alt="man leaning"
          />
        </div>
        <div className={styles.supportContainer}>
          <GatsbyImage
            image={supportImages[1].childImageSharp.gatsbyImageData}
            alt="man leaning"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {windowWidth < 800 ? (
        <div>
          <GatsbyImage
            image={mainImageMobile.childImageSharp.gatsbyImageData}
            alt="man posing"
          />
        </div>
      ) : (
        renderDesktopContent()
      )}
    </>
  )
}

export default HomeMensSection

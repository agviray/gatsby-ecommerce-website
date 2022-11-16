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
          mainImageMobile {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
          mainImageDesktop {
            childImageSharp {
              id
              gatsbyImageData(
                layout: FULL_WIDTH
                formats: [AUTO, WEBP]
                placeholder: BLURRED
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

  const { mainImageMobile, mainImageDesktop } = data.markdownRemark.frontmatter
  const { supportImages } = data.markdownRemark.frontmatter

  const renderDesktopContent = () => {
    return (
      <div className={styles.content}>
        <div className={styles.mainImageContainer}>
          <GatsbyImage
            image={mainImageDesktop.childImageSharp.gatsbyImageData}
            alt="woman posing"
          />
        </div>
        <div className={styles.supportImagesContainer}>
          <div className={styles.supportContainer01}>
            <GatsbyImage
              image={supportImages[0].childImageSharp.gatsbyImageData}
              alt="woman wearing sunglasses"
            />
          </div>
          <div className={styles.supportContainer01}>
            <GatsbyImage
              image={supportImages[1].childImageSharp.gatsbyImageData}
              alt="woman skirt bottoms"
            />
          </div>
          <div className={styles.womensDepartmentLink}></div>
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
            alt="woman posing"
          />
        </div>
      ) : (
        renderDesktopContent()
      )}
    </>
  )
}

export default HomeWomensSection

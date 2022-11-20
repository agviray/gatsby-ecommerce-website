import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/home-home-goods-section.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const HomeHomeGoodsSection = () => {
  const windowWidth = useWindowWidth()

  const data = useStaticQuery(graphql`
    query HomeHomeGoodsSectionComponent {
      markdownRemark(frontmatter: { slug: { eq: "home-goods" } }) {
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
        <>
          <GatsbyImage image={mobileImage} alt="red chair sitting in nature" />
        </>
      ) : (
        <>
          <GatsbyImage image={desktopImage} alt="potted plant in empty room" />
        </>
      )}
    </div>
  )
}

export default HomeHomeGoodsSection

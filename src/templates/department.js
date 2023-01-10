import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import CategoryProductSnippets from "../components/CategoryProductSnippets"
import {
  departmentContainer,
  departmentHeading,
  categoriesContainer,
  categoryImageContainer,
  mobilePortrait,
  categoryOverlay,
  textContainer,
  text,
  container,
  textBlock,
  categoryBlock,
  moreBlock,
  textBlockContent,
  arrow,
} from "../styles/department.module.css"
import useWindowDimensions from "../components/hooks/useWindowDimensions"

export default function Department({ data }) {
  const department = data.department.frontmatter
  const categories = data.categories.nodes
  const categoryProducts = data.categoryProducts.nodes

  const windowDimensions = useWindowDimensions()

  const renderMobileContent = () => {
    return categories.map(category => (
      <Link
        to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
        key={category.id}
      >
        <div className={categoryImageContainer}>
          <GatsbyImage
            className={
              windowDimensions.height > windowDimensions.width
                ? mobilePortrait
                : null
            }
            image={
              category.frontmatter.thumbnail.childImageSharp.gatsbyImageData
            }
            alt={"category thumbnail"}
            placeholder="blurred"
            objectFit="cover"
            objectPosition={"50% 50%"}
          />
          <div className={categoryOverlay}>
            <div className={textContainer}>
              <span className={text}>{category.frontmatter.name}</span>
            </div>
          </div>
        </div>
      </Link>
    ))
  }

  const renderDesktopContent = () => {
    return categories.map(category => (
      <div key={category.id} className={container}>
        <Link
          to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
        >
          <div className={`${textBlock} ${categoryBlock}`}>
            <div className={textBlockContent}>{category.frontmatter.name}</div>
          </div>
        </Link>
        <CategoryProductSnippets
          categorySlug={category.frontmatter.slug}
          categoryProducts={categoryProducts}
        />
        <Link
          to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
        >
          <div className={`${textBlock} ${moreBlock}`}>
            <div className={textBlockContent}>
              <span>MORE</span>
              <span className={arrow}></span>
            </div>
          </div>
        </Link>
      </div>
    ))
  }

  return (
    <Layout>
      <div className={departmentContainer}>
        {windowDimensions.width >= 800 ? (
          <div className={departmentHeading}>
            <h2>{department.name}</h2>
          </div>
        ) : null}
        <div className={categoriesContainer}>
          {windowDimensions.width < 800
            ? renderMobileContent()
            : renderDesktopContent()}
        </div>
      </div>
    </Layout>
  )
}

// - Use query data in the component by accessing the data prop.
export const query = graphql`
  query DepartmentPage($slug: String, $department: String) {
    department: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        department
        name
      }
    }

    categories: allMarkdownRemark(
      sort: { fields: frontmatter___placement, order: ASC }
      filter: {
        frontmatter: {
          contentType: { eq: "category products" }
          department: { eq: $department }
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          department
          name
          description
          slug
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }

    categoryProducts: allMarkdownRemark(
      sort: { fields: frontmatter___placement, order: ASC }
      filter: {
        frontmatter: {
          contentType: { eq: "product details" }
          department: { eq: $department }
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          department
          slug
          type
          name
          images {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP, JPG]
                placeholder: BLURRED
                layout: CONSTRAINED
                height: 580
                width: 386
              )
            }
          }
        }
      }
    }
  }
`

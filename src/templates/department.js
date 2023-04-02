import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import CategoryProductSnippets from "../components/CategoryProductSnippets"
import {
  breadcrumbsContainer,
  breadcrumbs,
  crumb,
} from "../styles/breadcrumbs.module.css"
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
  const departmentName = department.name.toUpperCase()

  const windowDimensions = useWindowDimensions()

  const renderMobileContent = () => {
    return categories.map(category => (
      <Link
        key={category.id}
        to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
      >
        <figure>
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
        </figure>
      </Link>
    ))
  }

  const renderDesktopContent = () => {
    return categories.map(category => (
      <section key={category.id}>
        <div key={category.id} className={container}>
          <Link
            to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
          >
            <div className={`${textBlock} ${categoryBlock}`}>
              <div className={textBlockContent}>
                {category.frontmatter.name}
              </div>
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
      </section>
    ))
  }

  return (
    <Layout>
      <section>
        <div className={departmentContainer}>
          {windowDimensions.width >= 800 ? (
            <div className={departmentHeading}>
              <h2>{department.name}</h2>
            </div>
          ) : null}
          <div className={categoriesContainer}>
            <section>
              <div className={breadcrumbsContainer}>
                <ul className={breadcrumbs}>
                  <li className={crumb}>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className={crumb}>
                    <span>{departmentName}</span>
                  </li>
                </ul>
              </div>
            </section>
            <section>
              {windowDimensions.width < 800
                ? renderMobileContent()
                : renderDesktopContent()}
            </section>
          </div>
        </div>
      </section>
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
          price
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

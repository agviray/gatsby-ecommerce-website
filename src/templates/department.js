import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import {
  departmentContainer,
  categoriesContainer,
  categoryImageContainer,
  mobilePortrait,
  innerContainer,
  textContainer,
  text,
} from "../styles/department.module.css"
import useWindowDimensions from "../components/hooks/useWindowDimensions"

export default function Department({ data }) {
  const department = data.department.frontmatter
  const categories = data.categories.nodes
  const windowDimensions = useWindowDimensions()

  return (
    <Layout>
      <div className={departmentContainer}>
        <div className={categoriesContainer}>
          {categories.map(category => (
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
                    category.frontmatter.thumbnail.childImageSharp
                      .gatsbyImageData
                  }
                  alt={"category thumbnail"}
                  placeholder="blurred"
                  objectFit="cover"
                  objectPosition={"50% 50%"}
                />
                <div className={innerContainer}>
                  <div className={textContainer}>
                    <span className={text}>{category.frontmatter.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
      sort: { fields: frontmatter___position }
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
  }
`

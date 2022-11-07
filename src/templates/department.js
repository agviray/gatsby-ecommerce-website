import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/department.module.css"

export default function Department({ data }) {
  const departmentCategories = data.departmentCategories.nodes
  console.log(departmentCategories)
  return (
    <Layout>
      <div className={styles.departmentContainer}>
        <h2>Department Heading!</h2>
        <span>All the categories under this department are shown below!</span>
        <div className={styles.categoriesContainer}>
          {departmentCategories.map(category => (
            <Link
              to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
              key={category.id}
            >
              <div>
                <GatsbyImage
                  image={
                    category.frontmatter.thumbnail.childImageSharp
                      .gatsbyImageData
                  }
                  alt={"category thumbnail"}
                />
                <h3>{category.frontmatter.category}</h3>
                <p>{category.frontmatter.description}</p>
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
  query DepartmentPage($department: String) {
    departmentCategories: allMarkdownRemark(
      filter: { frontmatter: { department: { eq: $department } } }
    ) {
      nodes {
        frontmatter {
          category
          department
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                formats: [AUTO, WEBP]
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
            }
          }
          slug
        }
      }
    }
  }
`

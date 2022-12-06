import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/department.module.css"

export default function Department({ data }) {
  const department = data.department.frontmatter
  const categories = data.categories.nodes

  console.log(data)

  return (
    <Layout>
      <div className={styles.departmentContainer}>
        <h2>{department.name}</h2>
        <span>All the categories under this department are shown below!</span>
        <div className={styles.categoriesContainer}>
          {categories.map(category => (
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
                <h3>{category.frontmatter.name}</h3>
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
  query DepartmentPage($slug: String, $department: String) {
    department: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        department
        name
      }
    }

    categories: allMarkdownRemark(
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

import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/collections.module.css"

export default function Collections({ data }) {
  const collectionCategories = data.categories.nodes
  return (
    <Layout>
      <div className={styles.collections}>
        <h2>Our Collections</h2>
        <span>We have several items to suit your style.</span>
        <div className={styles.categories}>
          {collectionCategories.map(category => (
            <Link
              to={`/collections/${category.frontmatter.slug}`}
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
                <h3>{category.frontmatter.title}</h3>
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
  query CollectionsPage {
    categories: allMarkdownRemark(
      sort: { fields: frontmatter___position, order: ASC }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                formats: [AUTO, WEBP]
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`

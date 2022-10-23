import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/collections.module.css"

export default function Collections({ data }) {
  const categories = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <div className={styles.collections}>
        <h2>Our Collections</h2>
        <span>We have several items to suit your style.</span>
        <div className={styles.categories}>
          {categories.map(category => (
            <Link
              to={`/collections/${category.frontmatter.slug}`}
              key={category.id}
            >
              <div>
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
  query Collections {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          slug
          description
        }
      }
    }
  }
`

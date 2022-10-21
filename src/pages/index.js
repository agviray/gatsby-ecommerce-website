import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata
  return (
    <Layout>
      <section className={styles.header}>
        <div>
          <h2>Official Online Store</h2>
          <span>Welcome to the shop!</span>
          <p>
            {title} - {description}
          </p>
        </div>
      </section>
    </Layout>
  )
}

// *** About const query ***
// - const query is a GraphQL query which was created via Gatsby's
//   GraphiQL IDE, accessed through visiting http://localhost:8000/___graphql
//   while your site is running on localhost:8000

// - Use data from the query by accessing the 'data'
//   property in the props object of this Home component.
export const query = graphql`
  query SiteInfo {
    site {
      siteMetadata {
        copyright
        description
        title
      }
    }
  }
`

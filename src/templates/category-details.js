import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from "../styles/category-details.module.css"

export default function CategoryDetails() {
  return (
    <Layout>
      <div className={styles.details}>
        <h2>Category Type</h2>
        <h3>Description</h3>
        <div className={styles.featured}>
          Banner Image
          {/* 
          Page banner image (if desired) can go here, but first need to add it to category markdown file frontmatter detail.
           */}
          {/* <GatsbyImage /> */}
        </div>
        {/* <div className={styles.html} dangerouslySetInnerHTML={} /> */}
      </div>
    </Layout>
  )
}

import React from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/collections.module.css"

export default function Collections() {
  return (
    <Layout>
      <div className={styles.collections}>
        <h2>Our Collections</h2>
        <span>We have several items to suit your style.</span>
      </div>
    </Layout>
  )
}

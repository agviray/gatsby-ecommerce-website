import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"

export default function Home() {
  return (
    <Layout>
      <section className={styles.header}>
        <div>
          <h2>Official Online Store</h2>
          <span>Welcome to the shop!</span>
        </div>
      </section>
    </Layout>
  )
}

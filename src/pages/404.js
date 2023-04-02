import React from "react"
import { Link } from "gatsby"
import {
  container,
  heading,
  subheading,
  content,
  siteLink,
} from "../styles/404.module.css"
import Layout from "../components/Layout"

export default function NotFound() {
  return (
    <Layout>
      <section>
        <div className={container}>
          <h2 className={heading}>404</h2>
          <h3 className={subheading}>PAGE NOT FOUND</h3>
          <div className={content}>
            <p>
              Uh-oh! Looks like the page you are trying to access does not
              exist.
            </p>
            <p>
              Head back to our{" "}
              <Link to="/">
                <span className={siteLink}>Home page</span>
              </Link>{" "}
              to continue shopping.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

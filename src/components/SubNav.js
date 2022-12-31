import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as styles from "../styles/subnav.module.css"

const SubNav = ({ deptSlug }) => {
  const data = useStaticQuery(graphql`
    query SubNavComponent {
      categories: allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "category products" } } }
        sort: { fields: frontmatter___placement, order: ASC }
      ) {
        nodes {
          id
          frontmatter {
            department
            name
            slug
          }
        }
      }
    }
  `)

  const department = deptSlug
  const allCategories = data.categories.nodes
  const categoriesToDisplay = allCategories.filter(
    category => category.frontmatter.department === department
  )

  console.log(categoriesToDisplay)

  return (
    <div className="container">
      <Link to={"https://www.google.com"}>Department Category 1</Link>
      <Link to={"https://www.google.com"}>Department Category 2</Link>
      <Link to={"https://www.google.com"}>Department Category 3</Link>
      <Link to={"https://www.google.com"}>Department Category 4</Link>
    </div>
  )
}

export default SubNav

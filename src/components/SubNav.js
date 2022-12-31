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

  return (
    <div className="container">
      {categoriesToDisplay.map(category => (
        <Link
          key={category.id}
          to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
        >
          {category.frontmatter.name}
        </Link>
      ))}
    </div>
  )
}

export default SubNav

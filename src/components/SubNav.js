import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import {
  subNav,
  departmentName,
  departmentLink,
  categoryLink,
} from "../styles/subnav.module.css"

const SubNav = ({ deptName, deptSlug }) => {
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

  const name = deptName
  const department = deptSlug
  const allCategories = data.categories.nodes
  const categoriesToDisplay = allCategories.filter(
    category => category.frontmatter.department === department
  )

  return (
    <div className={subNav}>
      {deptName ? <h3 className={departmentName}>{name}</h3> : null}
      <Link to={`/${deptSlug}`} className={departmentLink}>
        VIEW ALL
      </Link>
      {categoriesToDisplay.map(category => (
        <Link
          key={category.id}
          to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
          className={categoryLink}
        >
          {category.frontmatter.name}
        </Link>
      ))}
    </div>
  )
}

export default SubNav

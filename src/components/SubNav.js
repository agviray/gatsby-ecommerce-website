import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

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
    <div className="subnav">
      {deptName ? <div className="departmentName">{name}</div> : null}
      <Link to={`/${deptSlug}`} className="departmentLink">
        VIEW ALL
      </Link>
      {categoriesToDisplay.map(category => (
        <Link
          key={category.id}
          to={`/${category.frontmatter.department}/${category.frontmatter.slug}`}
          className="categoryLink"
        >
          {category.frontmatter.name}
        </Link>
      ))}
    </div>
  )
}

export default SubNav

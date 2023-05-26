import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductLink from "../components/ProductLink"

export default function CategoryProducts({ data }) {
  const category = data.category.frontmatter
  const products = data.products.nodes
  const department = category.department.toUpperCase()
  const categoryName =
    category.slug.charAt(0).toUpperCase() + category.slug.slice(1)

  const renderProductImages = product => {
    const productImages = product.frontmatter.images

    return productImages.map((image, index) => (
      <GatsbyImage
        key={index}
        image={image.childImageSharp.gatsbyImageData}
        alt={product.frontmatter.slug}
      />
    ))
  }

  return (
    <Layout>
      <div className="categoryProducts">
        <div className="categoryHeading">
          <h2>{category.name}</h2>
        </div>
        <div className="breadcrumbsWrapper">
          <ul className="breadcrumbs">
            <li className="crumb">
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li className="crumb">
              <Link to={`/${category.department}`}>
                <span>{department}</span>
              </Link>
            </li>
            <li className="crumb">
              <span>{categoryName}</span>
            </li>
          </ul>
        </div>
        <div className="productsContainer">
          {products.map(product => (
            <ProductLink
              key={product.id}
              name={product.frontmatter.name}
              price={product.frontmatter.price}
              to={`/${product.frontmatter.department}/${product.frontmatter.type}/${product.frontmatter.slug}`}
            >
              {renderProductImages(product)}
            </ProductLink>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CategoryProductsPage($slug: String, $department: String) {
    category: markdownRemark(
      frontmatter: { slug: { eq: $slug }, department: { eq: $department } }
    ) {
      frontmatter {
        department
        slug
        name
      }
    }

    products: allMarkdownRemark(
      sort: { fields: frontmatter___placement, order: ASC }
      filter: {
        frontmatter: { department: { eq: $department }, type: { eq: $slug } }
      }
    ) {
      nodes {
        frontmatter {
          images {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
          department
          name
          price
          type
          slug
        }
        id
      }
    }
  }
`

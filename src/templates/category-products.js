import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductLink from "../components/ProductLink"
import {
  container,
  categoryHeading,
  productsContainer,
} from "../styles/category-products.module.css"

export default function CategoryProducts({ data }) {
  // console.log(data)
  const departmentCategory = data.category.frontmatter
  const categoryProducts = data.products.nodes

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
      <div className={container}>
        <div className={categoryHeading}>
          <h2>{departmentCategory.category}</h2>
        </div>
        <div className={productsContainer}>
          {categoryProducts.map(product => (
            <ProductLink
              key={product.id}
              name={product.frontmatter.name}
              price={product.frontmatter.price}
              to={`/department/${product.frontmatter.type}/${product.frontmatter.slug}`}
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
  query CategoryProductsPage($slug: String) {
    category: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        category
        slug
      }
    }

    products: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: $slug } } }
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

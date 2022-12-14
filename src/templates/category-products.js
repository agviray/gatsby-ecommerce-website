import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductLink from "../components/ProductLink"
import {
  container,
  categoryHeading,
  productsContainer,
} from "../styles/category-products.module.css"

export default function CategoryProducts({ data }) {
  const category = data.category.frontmatter
  const products = data.products.nodes

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
          <h2>{category.name}</h2>
        </div>
        <div className={productsContainer}>
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

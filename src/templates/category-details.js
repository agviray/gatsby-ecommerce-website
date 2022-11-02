import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductLink from "../components/ProductLink"
import { container, category } from "../styles/category-details.module.css"

export default function CategoryDetails({ data }) {
  // console.log(data)
  const { title } = data.category.frontmatter
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
        <div className={category}>
          <h2>{title}</h2>
        </div>
        <>
          {categoryProducts.map(product => (
            <ProductLink
              key={product.id}
              name={product.frontmatter.name}
              price={product.frontmatter.price}
            >
              {renderProductImages(product)}
            </ProductLink>
          ))}
        </>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CategoryDetailsPage($slug: String) {
    category: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
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
          slug
        }
        id
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import {
  container,
  contents,
  imageContainer,
  detailsContainer,
  productName,
  description,
  price,
  sizeOptions,
  option,
  buttonContainer,
} from "../styles/product-details.module.css"

const ProductDetails = ({ data }) => {
  const product = data.product.frontmatter
  const name = product.name.toUpperCase()

  const renderProductSizes = sizes => {
    return sizes.map((size, index) => (
      <div className={option} key={index}>
        <span>{size}</span>
      </div>
    ))
  }

  return (
    <Layout>
      <div className={container}>
        <div className={contents}>
          <div className={imageContainer}>
            <GatsbyImage
              image={product.images[0].childImageSharp.gatsbyImageData}
              alt={product.slug}
            />
          </div>
          <div className={detailsContainer}>
            <div className={productName}>
              <span>{name}</span>
            </div>
            <div className={price}>{product.price}</div>
            <div className={description}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut,
                alias dolores sed molestias nobis minus debitis asperiores fugit
                blanditiis beatae corporis aliquam provident! Vero amet sint
                ullam dicta repudiandae hic.
              </p>
            </div>
            {product.allProductSizes ? (
              <div className={sizeOptions}>
                {renderProductSizes(product.allProductSizes)}
              </div>
            ) : null}
            <div className={buttonContainer}>
              <button>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProductDetailsPage($department: String, $slug: String) {
    product: markdownRemark(
      frontmatter: { department: { eq: $department }, slug: { eq: $slug } }
    ) {
      frontmatter {
        name
        price
        allProductSizes
        department
        type
        slug
        images {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default ProductDetails

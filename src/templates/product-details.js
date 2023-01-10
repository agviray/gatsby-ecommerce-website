import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductDetailsImages from "../components/ProductDetailsImages"
import {
  container,
  contents,
  imageContainer,
  productImage,
  productImage02,
  productImage03,
  productImage04,
  productImage05,
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

  // - productImages contains the same image with an overlay to
  //   simulate "different" product items.
  const productImages = [
    {
      imageNumber: "Image #1",
      content: () => (
        <GatsbyImage
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.slug}
          className={productImage}
        />
      ),
    },
    {
      imageNumber: "Image #2",
      content: () => (
        <GatsbyImage
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.slug}
          className={`${productImage} ${productImage02}`}
        />
      ),
    },
    {
      imageNumber: "Image #3",
      content: () => (
        <GatsbyImage
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.slug}
          className={`${productImage} ${productImage03}`}
        />
      ),
    },
    {
      imageNumber: "Image #4",
      content: () => (
        <GatsbyImage
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.slug}
          className={`${productImage} ${productImage04}`}
        />
      ),
    },
    {
      imageNumber: "Image #5",
      content: () => (
        <GatsbyImage
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.slug}
          className={`${productImage} ${productImage05}`}
        />
      ),
    },
  ]

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
            <ProductDetailsImages allProductImages={productImages} />
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

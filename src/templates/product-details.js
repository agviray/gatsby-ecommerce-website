import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"

const ProductDetails = ({ data }) => {
  const product = data.product.frontmatter
  console.log(product)
  return (
    <Layout>
      <div className="container">
        <div className="contents">
          <div className="imageContainer">
            <GatsbyImage
              image={product.images[0].childImageSharp.gatsbyImageData}
              alt={product.slug}
            />
          </div>
          <div className="detailsContainer">
            <div className="productName">
              <h2>{product.name}</h2>
            </div>
            <div className="description">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
                quasi minima iste ullam qui. Mollitia quo debitis dicta fuga
                dolorum nostrum nam ea qui odit aliquid exercitationem,
                repellat, esse quod!
              </p>
            </div>
            <div className="price">{product.price}</div>
            <ul className="sizeOptions">
              <li>S</li>
              <li>M</li>
              <li>L</li>
            </ul>
            <div>
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

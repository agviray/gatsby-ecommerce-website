import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useWindowDimensions from "./hooks/useWindowDimensions"

const CategoryProductSnippets = ({ categorySlug, categoryProducts }) => {
  const windowDimensions = useWindowDimensions()
  const category = categorySlug
  const allProducts = categoryProducts.map(product => product.frontmatter)
  const productsTodisplay = allProducts
    .filter(product => product.type === category)
    .slice(0, 3)

  const renderContent = () => {
    const products = [...productsTodisplay]
    return products.map((product, index) => (
      <Link
        key={index}
        to={`/${product.department}/${product.type}/${product.slug}`}
        className="link"
      >
        <figure>
          <div className="imageContainer">
            <GatsbyImage
              className="image"
              image={product.images[0].childImageSharp.gatsbyImageData}
              alt={product.name}
              placeholder="blurred"
              objectFit="cover"
              objectPosition={"50% 50%"}
            />
            <div className="imageOverlay">
              <span className="productName">{product.name}</span>
              <span className="productPrice">{product.price}</span>
            </div>
          </div>
        </figure>
      </Link>
    ))
  }

  return (
    <>
      {windowDimensions.width < 800 ? null : (
        <div className="categoryProductSnippets">{renderContent()}</div>
      )}
    </>
  )
}

export default CategoryProductSnippets

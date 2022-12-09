import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  container,
  textBlock,
  image,
} from "../styles/category-product-snippets.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const CategoryProductSnippets = ({
  categoryName,
  categorySlug,
  categoryProducts,
}) => {
  const windowDimensions = useWindowDimensions()
  const category = categorySlug
  const allProducts = categoryProducts.map(product => product.frontmatter)
  const productsTodisplay = allProducts
    .filter(product => product.type === category)
    .slice(0, 3)

  const renderContent = () => {
    const products = [...productsTodisplay]
    return products.map((product, index) => (
      <GatsbyImage
        key={index}
        className={image}
        image={product.images[0].childImageSharp.gatsbyImageData}
        alt={product.name}
      />
    ))
  }

  return (
    <div className={container}>
      <div className={textBlock}>
        <span>{categoryName}</span>
      </div>
      {windowDimensions.width < 800 ? null : renderContent()}
      <div className={textBlock}>
        <span>MORE</span>
      </div>
    </div>
  )
}

export default CategoryProductSnippets

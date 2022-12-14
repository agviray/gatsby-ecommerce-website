import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  container,
  link,
  image,
} from "../styles/category-product-snippets.module.css"
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
        className={link}
      >
        <GatsbyImage
          className={image}
          image={product.images[0].childImageSharp.gatsbyImageData}
          alt={product.name}
          placeholder="blurred"
          objectFit="cover"
          objectPosition={"50% 50%"}
        />
      </Link>
    ))
  }

  return (
    <>
      {windowDimensions.width < 800 ? null : (
        <div className={container}>{renderContent()}</div>
      )}
    </>
  )
}

export default CategoryProductSnippets

import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import ProductDetailsImages from "../components/ProductDetailsImages"
import {
  wrapper,
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
  activeSize,
  buttonContainer,
  errorModal,
  errorActive,
  errorContent,
  errorBox,
} from "../styles/product-details.module.css"

const initialSelection = {
  name: "",
  image: "",
  price: null,
  size: "",
  quantity: 1,
}

const ProductDetails = ({ data }) => {
  const [selection, setSelection] = useState(initialSelection)
  const [selectedSize, setSelectedSize] = useState("")
  const [isError, setIsError] = useState(false)
  const product = data.product.frontmatter
  const name = product.name.toUpperCase()

  useEffect(() => {
    if (selection.name === "") {
      setSelection({
        image: product.images[0].childImageSharp.gatsbyImageData,
        name: product.name,
        price: product.price,
        size: "",
        quantity: 1,
      })
    }
  }, [])

  // *** About useEffect's contents ***
  // - Checks to see what department the product is under, as the
  //   department determines the selected 'size'.
  // - For example, accessories products come in one size, and home-goods
  //   products sizes don't exist--whereas clothing sizes vary.
  useEffect(() => {
    if (product.department === "accessories") {
      setSelectedSize("OS")
    } else if (product.department === "home-goods") {
      setSelectedSize(null)
    } else {
      return
    }
  }, [selection])

  // *** About useEffect's contents ***
  // - Updates selection size value when user selects or changes their
  //   size selection.
  useEffect(() => {
    if (selectedSize === "") {
      return
    }

    if (selection.size !== selectedSize) {
      setSelection({ ...selection, size: selectedSize })
    }
  }, [selectedSize])

  useEffect(() => {
    if (isError) {
      document.body.style.overflow = "hidden"
    }

    if (!isError) {
      document.body.style.overflow = "visible"
    }
  }, [isError])

  // *** About productImages ***
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
      <div
        onClick={() => updateSelectedSize(size)}
        className={`${option} ${size === selectedSize ? `${activeSize}` : ""} `}
        key={index}
      >
        <span>{size}</span>
      </div>
    ))
  }

  const updateSelectedSize = size => {
    setSelectedSize(size)
  }

  const addToBag = (e, item) => {
    e.preventDefault()
    const product = { ...item }
    if (product.size === "") {
      setIsError(true)
    }
  }

  return (
    <div className={wrapper}>
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
                  alias dolores sed molestias nobis minus debitis asperiores
                  fugit blanditiis beatae corporis aliquam provident! Vero amet
                  sint ullam dicta repudiandae hic.
                </p>
              </div>
              {product.allProductSizes ? (
                <div className={sizeOptions}>
                  {renderProductSizes(product.allProductSizes)}
                </div>
              ) : null}
              <div
                onClick={e => addToBag(e, selection)}
                className={buttonContainer}
              >
                <button>ADD TO BAG</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <div className={`${errorModal} ${isError ? `${errorActive}` : ""}`}>
        <div className={errorContent}>
          <div className={errorBox}>
            Please select a size
            <div
              onClick={e => {
                e.preventDefault()
                setIsError(false)
              }}
              className={buttonContainer}
            >
              <button>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

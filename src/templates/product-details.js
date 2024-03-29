import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BagContext } from "../components/BagContextComponent"
import Layout from "../components/Layout"
import ProductDetailsImages from "../components/ProductDetailsImages"
import Modal from "../components/Modal"

const initialSelection = {
  name: "",
  image: "",
  price: null,
  size: "",
  quantity: 1,
}

const initialSelectedSize = ""

const ProductDetails = ({ data }) => {
  const [selection, setSelection] = useState(initialSelection)
  const [selectedSize, setSelectedSize] = useState(initialSelectedSize)
  const [modalContent, setModalContent] = useState({})
  const [displayModal, setDisplayModal] = useState(false)

  const product = data.product.frontmatter
  const name = product.name.toUpperCase()
  const department = product.department.toUpperCase()
  const category = product.type.charAt(0).toUpperCase() + product.type.slice(1)

  // - Sets appropriate value for selection state, depending on
  //   department in view.
  useEffect(() => {
    if (selection.name === "") {
      setSelection({
        image: product.images[0].childImageSharp.gatsbyImageData,
        name: product.name,
        price: product.price,
        size: "",
        quantity: 1,
        department: product.department,
        type: product.type,
        slug: product.slug,
      })
    }

    if (product.department === "accessories") {
      setSelectedSize("OS")
    } else if (product.department === "home-goods") {
      setSelectedSize(null)
    } else {
      return
    }
  }, [selection])

  // - Update selection with current selectedSize,
  //   any time selectedSize changes.
  useEffect(() => {
    if (selectedSize === "") {
      return
    }
    if (selection.size !== selectedSize) {
      setSelection({ ...selection, size: selectedSize })
    }
  }, [selectedSize])

  // - Prevent/pause scrolling if a modal is open.
  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = "hidden"
    }
    if (!displayModal) {
      document.body.style.overflow = "visible"
    }
  }, [displayModal])

  // - Display modal if there is modal content to show.
  useEffect(() => {
    if (Object.keys(modalContent).length === 0) {
      setDisplayModal(false)
    } else {
      setDisplayModal(true)
    }
  }, [modalContent])

  // *** About productImages ***
  // - productImages contains the same image with an overlay to
  //   simulate "different" product items.
  const productImages = [
    {
      imageNumber: "Image #1",
      content: () => (
        <figure>
          <GatsbyImage
            image={product.images[0].childImageSharp.gatsbyImageData}
            alt={product.slug}
            className="productImage"
          />
        </figure>
      ),
    },
    {
      imageNumber: "Image #2",
      content: () => (
        <figure>
          <GatsbyImage
            image={product.images[0].childImageSharp.gatsbyImageData}
            alt={product.slug}
            className={`productImage productImage02`}
          />
        </figure>
      ),
    },
    {
      imageNumber: "Image #3",
      content: () => (
        <figure>
          <GatsbyImage
            image={product.images[0].childImageSharp.gatsbyImageData}
            alt={product.slug}
            className={`productImage productImage03`}
          />
        </figure>
      ),
    },
    {
      imageNumber: "Image #4",
      content: () => (
        <figure>
          <GatsbyImage
            image={product.images[0].childImageSharp.gatsbyImageData}
            alt={product.slug}
            className={`productImage productImage04`}
          />
        </figure>
      ),
    },
    {
      imageNumber: "Image #5",
      content: () => (
        <figure>
          <GatsbyImage
            image={product.images[0].childImageSharp.gatsbyImageData}
            alt={product.slug}
            className={`productImage productImage05`}
          />
        </figure>
      ),
    },
  ]

  const renderProductSizes = sizes => {
    return sizes.map((size, index) => (
      <div
        onClick={() => updateSelectedSize(size)}
        className={`option ${size === selection.size ? "activeSize" : ""}`}
        key={index}
      >
        <span>{size}</span>
      </div>
    ))
  }

  const updateSelectedSize = size => {
    setSelectedSize(size)
  }

  const updateModalContent = (errorStatus, errorMessage) => {
    setModalContent({
      doesErrorExist: errorStatus,
      message: errorMessage,
    })
  }

  const handleAddToBagClick = (e, item, bagContext) => {
    e.preventDefault()
    if (item.size === "") {
      updateModalContent(true, "Please select a size")
      return
    } else {
      bagContext.addItemToBag(item, updateModalContent)
    }
  }

  const closeModal = e => {
    e.preventDefault()
    setSelection(initialSelection)
    setSelectedSize(initialSelectedSize)
    setModalContent({})
  }

  return (
    <div className="productDetailsWrapper">
      <Layout>
        <div className="productDetails">
          <section>
            <div className="breadcrumbsWrapper">
              <ul className="breadcrumbs">
                <li className="crumb">
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </li>
                <li className="crumb">
                  <Link to={`/${product.department}`}>
                    <span>{department}</span>
                  </Link>
                </li>
                <li className="crumb">
                  <Link to={`/${product.department}/${product.type}`}>
                    {category}
                  </Link>
                </li>
                <li className="crumb">{product.name}</li>
              </ul>
            </div>
          </section>
          <section>
            <div className="produtDetailsContents">
              <div>
                <ProductDetailsImages allProductImages={productImages} />
              </div>
              <div className="detailsContainer">
                <h2 className="productName">{name}</h2>
                <div className="price">{product.price}</div>
                <div className="productDescription">
                  <p>{product.description}</p>
                </div>
                <div>
                  {selectedSize === null ? null : <p>Select a size</p>}
                  {product.allProductSizes ? (
                    <div className="sizeOptions">
                      {renderProductSizes(product.allProductSizes)}
                    </div>
                  ) : null}
                </div>
                <div className="buttonContainer">
                  <BagContext.Consumer>
                    {value => (
                      <>
                        <button
                          onClick={e =>
                            handleAddToBagClick(e, selection, value)
                          }
                          className="addToBagButton"
                        >
                          ADD TO BAG
                        </button>
                      </>
                    )}
                  </BagContext.Consumer>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
      <Modal activeStatus={displayModal}>
        <div className="messageBox">
          <p>{modalContent.message}</p>
          {Object.keys(modalContent).length === 0 ? null : (
            <button onClick={e => closeModal(e)} className="modalButton">
              OK
            </button>
          )}
        </div>
      </Modal>
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
        description
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

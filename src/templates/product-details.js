import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BagContext } from "../components/BagContextComponent"
import Layout from "../components/Layout"
import ProductDetailsImages from "../components/ProductDetailsImages"
import Modal from "../components/Modal"
import {
  breadcrumbsContainer,
  breadcrumbs,
  crumb,
} from "../styles/breadcrumbs.module.css"
import {
  wrapper,
  container,
  contents,
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
  addToBagButton,
  activeSize,
} from "../styles/product-details.module.css"
import { messageBox, modalButton } from "../styles/modal.module.css"

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

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))

    if (storedBag) {
      const updateStatus = storedBag.isBagUpdated
      if (updateStatus === true) {
        const newBagToStore = { ...storedBag, isBagUpdated: false }
        localStorage.setItem("bag", JSON.stringify({ ...newBagToStore }))
        setModalContent({
          doesErrorExist: false,
          message: `Item "${product.name}" was added to your bag`,
        })
      }
    }
  })

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

  useEffect(() => {
    if (selectedSize === "") {
      return
    }

    if (selection.size !== selectedSize) {
      setSelection({ ...selection, size: selectedSize })
    }
  }, [selectedSize])

  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = "hidden"
    }

    if (!displayModal) {
      document.body.style.overflow = "visible"
    }
  }, [displayModal])

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
        className={`${option} ${
          size === selection.size ? `${activeSize}` : ""
        }`}
        key={index}
      >
        <span>{size}</span>
      </div>
    ))
  }

  const updateSelectedSize = size => {
    setSelectedSize(size)
  }

  const addItemToBag = (e, item, bagContext) => {
    e.preventDefault()
    let currentBagItems = [...bagContext.itemsInBag]
    let updatedBagItems = [...currentBagItems]
    let itemToAdd = { ...item }
    let itemToAddIsCopy = false

    if (itemToAdd.size === "") {
      setModalContent({
        doesErrorExist: true,
        message: `Please select a size`,
      })
      return
    }

    if (currentBagItems.length === 0) {
      itemToAdd = { ...itemToAdd, id: 0 }
      updatedBagItems = [itemToAdd]
      setSelection(initialSelection)
      setSelectedSize(initialSelectedSize)
      bagContext.updateItemsInBag([...updatedBagItems])
      bagContext.changeBagUpdated(true)
    } else {
      currentBagItems.forEach((item, index, thisArray) => {
        item.id = index
        if (item.name === itemToAdd.name && item.size === itemToAdd.size) {
          const updatedItem = { ...itemToAdd, quantity: item.quantity + 1 }
          thisArray[index] = updatedItem
          itemToAddIsCopy = true
        }
      })
      updatedBagItems = [...currentBagItems]
      if (itemToAddIsCopy === false) {
        itemToAdd.id = updatedBagItems.length
        updatedBagItems = [...updatedBagItems, itemToAdd]
      }

      setSelection(initialSelection)
      setSelectedSize(initialSelectedSize)
      bagContext.updateItemsInBag([...updatedBagItems])
      bagContext.changeBagUpdated(true)
    }
  }

  return (
    <div className={wrapper}>
      <Layout>
        <div className={container}>
          <section>
            <div className={breadcrumbsContainer}>
              <ul className={breadcrumbs}>
                <li className={crumb}>
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </li>
                <li className={crumb}>
                  <Link to={`/${product.department}`}>
                    <span>{department}</span>
                  </Link>
                </li>
                <li className={crumb}>
                  <Link to={`/${product.department}/${product.type}`}>
                    {category}
                  </Link>
                </li>
                <li className={crumb}>{product.name}</li>
              </ul>
            </div>
          </section>
          <section>
            <div className={contents}>
              <div>
                <ProductDetailsImages allProductImages={productImages} />
              </div>
              <div className={detailsContainer}>
                <h2 className={productName}>{name}</h2>
                <div className={price}>{product.price}</div>
                <div className={description}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aut, alias dolores sed molestias nobis minus debitis
                    asperiores fugit blanditiis beatae corporis aliquam
                    provident! Vero amet sint ullam dicta repudiandae hic.
                  </p>
                </div>
                <div>
                  <p>Select a size</p>
                  {product.allProductSizes ? (
                    <div className={sizeOptions}>
                      {renderProductSizes(product.allProductSizes)}
                    </div>
                  ) : null}
                </div>
                <div className={buttonContainer}>
                  <BagContext.Consumer>
                    {value => (
                      <button
                        onClick={e => addItemToBag(e, selection, value)}
                        className={addToBagButton}
                      >
                        ADD TO BAG
                      </button>
                    )}
                  </BagContext.Consumer>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
      <Modal activeStatus={displayModal}>
        <div className={messageBox}>
          <p>{modalContent.message}</p>
          {Object.keys(modalContent).length === 0 ? null : (
            <button onClick={e => setModalContent({})} className={modalButton}>
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

import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"

const ProductDetails = () => {
  return (
    <Layout>
      <div className="container">
        <div className="subNav">
          <a href="#">
            <span>Category Products</span>
          </a>
          /<span>Product Name</span>
        </div>
        <div className="flexContainer">
          <div className="imageConatiner">
            Image goes here
            {/* <img /> */}
          </div>
          <div className="infoContainer">
            <div className="productHeading">
              <h2>Product Name</h2>
            </div>
            <div className="productPurchaseOptions">
              <p>Size options</p>
              <p>Quatity options</p>
              <button>Add to Bag</button>
            </div>
            <div className="productDetails">
              <h3>Details</h3>
              <div className="description">
                <p>General clothing description</p>
                <p>Fit description</p>
              </div>
              <div className="contentCare">
                <p>100% cotton</p>
                <p>Machine wash</p>
                <p>Imported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails

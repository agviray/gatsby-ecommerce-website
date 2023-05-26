import React from "react"
import Layout from "../components/Layout"

export default function About() {
  return (
    <Layout>
      <div className="about">
        <div className="heading">
          <h2>ABOUT US</h2>
        </div>
        <div className="content">
          <div className="contentBlock">
            <p>Welcome to Garments & Goods!</p>
            <p>
              We are a team of artisans, designers, and fashion enthusiasts who
              are passionate about bringing quality goods to our customers. Our
              mission is to provide high-quality products at affordable prices,
              without compromising on comfort or style.
            </p>
            <p>
              We offer a diverse selection of clothing for men and women, as
              well as home goods for your abode. Whether you’re looking to
              update your wardrobe, or just searching for a little something to
              spruce up your home—we have something here for everyone!
            </p>
            <p>
              At our Garments & Goods, we believe that shopping should be a
              seamless and enjoyable experience. We pride ourselves on providing
              excellent customer service, and our knowledgeable staff are always
              ready to assist you with any questions or concerns you may have.
            </p>
            <p>
              We hope you enjoy browsing our collection, and we look forward to
              serving you!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

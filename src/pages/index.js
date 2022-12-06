import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import {
  section,
  innerContainer,
  textContainer,
  text,
} from "../styles/home.module.css"
import HomeWomensSection from "../components/HomeWomensSection"
import HomeMensSection from "../components/HomeMensSection"
import HomeHomeGoodsSection from "../components/HomeHomeGoodsSection"
import HomeAccessoriesSection from "../components/HomeAccessoriesSection"

export default function Home() {
  return (
    <Layout>
      <Link to={"/womens"}>
        <section className={section}>
          <div className={innerContainer}>
            <div className={textContainer}>
              <span className={text}>WOMEN</span>
            </div>
          </div>
          <HomeWomensSection />
        </section>
      </Link>
      <Link to={"mens"}>
        <section className={section}>
          <div className={innerContainer}>
            <div className={textContainer}>
              <span className={text}>MEN</span>
            </div>
          </div>
          <HomeMensSection />
        </section>
      </Link>
      <Link to={"/accessories"}>
        <section className={section}>
          <div className={innerContainer}>
            <div className={textContainer}>
              <span className={text}>ACCESSORIES</span>
            </div>
          </div>
          <HomeAccessoriesSection />
        </section>
      </Link>
      <Link to={"home-goods"}>
        <section className={section}>
          <div className={innerContainer}>
            <div className={textContainer}>
              <span className={text}>HOME GOODS</span>
            </div>
          </div>
          <HomeHomeGoodsSection />
        </section>
      </Link>
    </Layout>
  )
}

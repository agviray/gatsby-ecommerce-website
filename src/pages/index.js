import React from "react"
import Layout from "../components/Layout"
import HomeWomensSection from "../components/HomeWomensSection"
import HomeMensSection from "../components/HomeMensSection"
import HomeHomeGoodsSection from "../components/HomeHomeGoodsSection"
import HomeGiftsSection from "../components/HomeGiftsSection"

export default function Home() {
  return (
    <Layout>
      <section>
        <HomeWomensSection />
      </section>
      <section>
        <HomeMensSection />
      </section>
      <section>
        <HomeGiftsSection />
      </section>
      <section>
        <HomeHomeGoodsSection />
      </section>
    </Layout>
  )
}

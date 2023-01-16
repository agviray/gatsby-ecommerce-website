import React from "react"
import {
  container,
  heading,
  content,
  contentBlock,
} from "../styles/about.module.css"
import Layout from "../components/Layout"

export default function About() {
  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>ABOUT US</h2>
        </div>
        <div className={content}>
          <div className={contentBlock}>
            <h3>OUR VISION</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              quo facere voluptates ut nam fugit, dolore laborum culpa est minus
              fuga officia vitae odit accusamus iusto. Iste officiis, officia ea
              laudantium aliquam magni impedit dolores rerum ipsam incidunt
              libero animi.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

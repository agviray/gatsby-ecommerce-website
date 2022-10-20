import React from "react"
import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{children}</div>
      <footer>Copyright 2022 E-commerce Site</footer>
    </div>
  )
}

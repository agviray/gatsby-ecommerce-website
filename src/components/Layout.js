import React from "react"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{/* Content will go here */}</div>
      <footer>Copyright 2022 E-commerce Site</footer>
    </div>
  )
}

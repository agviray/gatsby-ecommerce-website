import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/subnav.module.css"

const SubNav = () => {
  return (
    <div className="container">
      <Link to={"https://www.google.com"}>Department Category 1</Link>
      <Link to={"https://www.google.com"}>Department Category 2</Link>
      <Link to={"https://www.google.com"}>Department Category 3</Link>
      <Link to={"https://www.google.com"}>Department Category 4</Link>
    </div>
  )
}

export default SubNav

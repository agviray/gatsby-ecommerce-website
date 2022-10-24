import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/navmenu.module.css"

const NavMenu = () => {
  return (
    <div className={styles.menu}>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/collections"}>Collections</Link>
    </div>
  )
}

export default NavMenu

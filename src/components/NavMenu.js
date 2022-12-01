import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/navmenu.module.css"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({ isMenuOpen }) => {
  const windowDimensions = useWindowDimensions()

  const navMenu = (
    <div className={styles.menu}>
      <Link to={"/womens"}>Women's</Link>
      <Link to={"/mens"}>Men's</Link>
      <Link to={"/gifts"}>Gifts</Link>
      <Link to={"/home-goods"}>Home Goods</Link>
    </div>
  )

  return windowDimensions.width < 800 ? (
    <div
      className={`${styles.container} ${isMenuOpen ? `${styles.isOpen}` : ``}`}
    >
      {navMenu}
    </div>
  ) : (
    <>{navMenu}</>
  )
}

export default NavMenu

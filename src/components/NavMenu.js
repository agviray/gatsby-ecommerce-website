import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/navmenu.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const NavMenu = ({ isMenuOpen }) => {
  const windowWidth = useWindowWidth()

  const navMenu = (
    <div className={styles.menu}>
      <Link to={"/womens"}>Women's</Link>
      <Link to={"/mens"}>Men's</Link>
      <Link to={"/home-goods"}>Home Goods</Link>
    </div>
  )

  return windowWidth < 800 ? (
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

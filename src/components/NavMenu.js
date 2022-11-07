import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/navmenu.module.css"
import useWindowWidth from "./hooks/useWindowWidth"

const NavMenu = ({ isMenuOpen }) => {
  const windowWidth = useWindowWidth()

  const navMenu = (
    <div className={styles.menu}>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/mens/new-styles"}>New Styles</Link>
      <Link to={"/mens/tops"}>Tops</Link>
      <Link to={"/mens/bottoms"}>Bottoms</Link>
      <Link to={"/mens/footwear"}>Footwear</Link>
      <Link to={"/mens/outerwear"}>Outerwear</Link>
      <Link to={"/mens/accessories"}>Accessories</Link>
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

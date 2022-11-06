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
      <Link to={"/department/new-styles"}>New Styles</Link>
      <Link to={"/department/tops"}>Tops</Link>
      <Link to={"/department/bottoms"}>Bottoms</Link>
      <Link to={"/department/footwear"}>Footwear</Link>
      <Link to={"/department/outerwear"}>Outerwear</Link>
      <Link to={"/department/accessories"}>Accessories</Link>
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

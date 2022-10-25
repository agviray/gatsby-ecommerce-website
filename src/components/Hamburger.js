import React from "react"
import * as styles from "../styles/hamburger.module.css"

const Hamburger = ({ isMenuOpen, onIsMenuOpenChange }) => {
  const toggleMenu = () => {
    onIsMenuOpenChange()
  }

  return (
    <div className={`${styles.hamburger}`} onClick={toggleMenu}>
      <span className={`${isMenuOpen ? `${styles.toggled}` : ``}`} />
      <span className={`${isMenuOpen ? `${styles.toggled}` : ``}`} />
      <span className={`${isMenuOpen ? `${styles.toggled}` : ``}`} />
    </div>
  )
}

export default Hamburger

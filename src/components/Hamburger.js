import React from "react"
import * as styles from "../styles/hamburger.module.css"

const Hamburger = ({ onIsMenuOpenChange }) => {
  const toggleMenu = () => {
    onIsMenuOpenChange()
  }

  return (
    <div className={`${styles.hamburger}`} onClick={toggleMenu}>
      <span />
      <span />
      <span />
    </div>
  )
}

export default Hamburger

import React from "react"

const Hamburger = ({ isMenuOpen, onIsMenuOpenChange }) => {
  const toggleMenu = () => {
    onIsMenuOpenChange()
  }

  return (
    <div className="hamburger" onClick={toggleMenu}>
      <span className={`${isMenuOpen ? "toggled" : ""}`} />
      <span className={`${isMenuOpen ? "toggled" : ""}`} />
      <span className={`${isMenuOpen ? "toggled" : ""}`} />
    </div>
  )
}

export default Hamburger

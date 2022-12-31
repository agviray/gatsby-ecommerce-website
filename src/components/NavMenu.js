import React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/navmenu.module.css"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({ isMenuOpen, departmentDetails }) => {
  const windowDimensions = useWindowDimensions()
  const departments = departmentDetails

  const navMenu = (
    <div className={styles.menu}>
      {departments.map(department => (
        <div key={department.id}>
          <Link to={`/${department.frontmatter.slug}`}>
            {department.frontmatter.name}
          </Link>
          <SubNav deptSlug={department.frontmatter.slug} />
        </div>
      ))}
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

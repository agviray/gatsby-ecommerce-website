import React from "react"
import { Link } from "gatsby"
import {
  container,
  menu,
  menuItem,
  isOpen,
  deptLink,
} from "../styles/navmenu.module.css"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({ isMenuOpen, departmentDetails }) => {
  const windowDimensions = useWindowDimensions()
  const departments = departmentDetails

  const navMenu = (
    <div className={menu}>
      {departments.map(department => (
        <div key={department.id} className={menuItem}>
          <Link to={`/${department.frontmatter.slug}`} className={deptLink}>
            {department.frontmatter.name}
          </Link>
          <SubNav deptSlug={department.frontmatter.slug} />
        </div>
      ))}
    </div>
  )

  return windowDimensions.width < 800 ? (
    <div className={`${container} ${isMenuOpen ? `${isOpen}` : ``}`}>
      {navMenu}
    </div>
  ) : (
    <>{navMenu}</>
  )
}

export default NavMenu

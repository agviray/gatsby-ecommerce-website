import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
  container,
  menu,
  menuItem,
  isOpen,
  deptSlide,
  deptName,
} from "../styles/navmenu.module.css"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({ isMenuOpen, departmentDetails }) => {
  const [selectedDept, setSelectedDept] = useState("")
  const departments = departmentDetails
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    if (isMenuOpen === false && selectedDept !== "") {
      return setSelectedDept("")
    }
  }, [isMenuOpen])

  const navMenu = (
    <div className={menu}>
      <div className={deptSlide}>
        {departments.map(department => (
          <div key={department.id} className={menuItem}>
            {windowDimensions.width < 800 ? (
              <>
                <span
                  onClick={() => setSelectedDept(department.frontmatter.slug)}
                  className={deptName}
                >
                  {department.frontmatter.name}
                </span>
              </>
            ) : (
              <Link to={`/${department.frontmatter.slug}`} className={deptName}>
                {department.frontmatter.name}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="categoriesSlide">
        {selectedDept === "" ? null : (
          <SubNav deptSlug={selectedDept === "" ? null : selectedDept} />
        )}
      </div>
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

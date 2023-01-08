import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
  container,
  menu,
  menuItem,
  isOpen,
  deptSlide,
  deptName,
  isHovered,
  categoriesSlide,
  isSlid,
  arrowContainer,
  text,
  arrow,
} from "../styles/navmenu.module.css"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({
  hoveredDept,
  onHoveredDeptChanged,
  isMenuOpen,
  departmentDetails,
}) => {
  const [selectedDept, setSelectedDept] = useState({
    name: "",
    slug: "",
  })
  const [slideToCategories, setSlideToCategories] = useState(false)
  const [hasIsHoveredClass, setHasIsHoveredClass] = useState(false)
  const departments = departmentDetails
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    if (
      isMenuOpen === false &&
      selectedDept !==
        {
          name: "",
          slug: "",
        }
    ) {
      clearSelectedDept()
    }
  }, [isMenuOpen])

  const clearSelectedDept = () => {
    setSelectedDept({
      name: "",
      slug: "",
    })
    setSlideToCategories(false)
  }

  const showCategories = (deptName, deptSlug) => {
    setSelectedDept({
      name: deptName,
      slug: deptSlug,
    })
    setSlideToCategories(true)
  }

  const onMouseEnterDept = dept => {
    onHoveredDeptChanged(true, dept.frontmatter.name, dept.frontmatter.slug)
  }

  const onMouseLeaveDept = () => {
    onHoveredDeptChanged(false, "", "")
  }

  const mobileContents = (
    <>
      <div className={deptSlide}>
        {departments.map(department => (
          <div key={department.id} className={menuItem}>
            <h3
              onClick={() =>
                showCategories(
                  department.frontmatter.name,
                  department.frontmatter.slug
                )
              }
              className={deptName}
            >
              {department.frontmatter.name}
            </h3>
          </div>
        ))}
      </div>
      <div className={categoriesSlide}>
        <div onClick={clearSelectedDept} className={arrowContainer}>
          <span className={arrow}></span>
          <span className={text}>BACK</span>
        </div>
        {selectedDept.name === "" ? null : (
          <SubNav
            deptName={selectedDept.name === "" ? null : selectedDept.name}
            deptSlug={selectedDept.slug === "" ? null : selectedDept.slug}
          />
        )}
      </div>
    </>
  )

  const desktopContents = (
    <>
      {departments.map(department => (
        <Link
          onMouseEnter={() => onMouseEnterDept(department)}
          onMouseLeave={onMouseLeaveDept}
          key={department.id}
          to={`/${department.frontmatter.slug}`}
        >
          <div
            className={`${deptName} ${
              hoveredDept.slug === department.frontmatter.slug
                ? `${isHovered}`
                : ""
            }`}
          >
            {department.frontmatter.name}
          </div>
        </Link>
      ))}
    </>
  )

  const navMenu = (
    <div className={`${menu} ${slideToCategories ? `${isSlid}` : ``}`}>
      {windowDimensions.width < 800 ? mobileContents : desktopContents}
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

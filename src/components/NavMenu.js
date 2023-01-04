import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
  container,
  menu,
  menuItem,
  isOpen,
  deptSlide,
  deptName,
  categoriesSlide,
  isSlid,
} from "../styles/navmenu.module.css"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({ isMenuOpen, departmentDetails }) => {
  const [selectedDept, setSelectedDept] = useState({
    name: "",
    slug: "",
  })

  const [slideToCategories, setSlideToCategories] = useState(false)
  const departments = departmentDetails
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    const clearSelectedDept = () => {
      setSelectedDept({
        name: "",
        slug: "",
      })
      setSlideToCategories(false)
    }

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

  const showCategories = (deptName, deptSlug) => {
    setSelectedDept({
      name: deptName,
      slug: deptSlug,
    })
    setSlideToCategories(true)
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
        <div key={department.id} className={menuItem}>
          <Link to={`/${department.frontmatter.slug}`} className={deptName}>
            {department.frontmatter.name}
          </Link>
        </div>
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

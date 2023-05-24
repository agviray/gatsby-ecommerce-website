import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import SubNav from "./SubNav"
import useWindowDimensions from "./hooks/useWindowDimensions"

const NavMenu = ({
  hoveredDept,
  onHoveredDeptChanged,
  isMenuOpen,
  onIsMenuOpenChange,
  departmentDetails,
}) => {
  const [selectedDept, setSelectedDept] = useState({
    name: "",
    slug: "",
  })
  const [slideToCategories, setSlideToCategories] = useState(false)
  const departments = departmentDetails
  const windowDimensions = useWindowDimensions()
  const menuContainerRef = useRef(null)

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

  const routeToFooter = () => {
    onIsMenuOpenChange()
  }

  const closeMenu = e => {
    const menuContainer = menuContainerRef.current
    if (menuContainer.contains(e.target)) {
      return
    } else {
      onIsMenuOpenChange()
    }
  }

  const mobileContents = (
    <>
      <div className="deptSlide">
        <div className="slideContents">
          {departments.map(department => (
            <div key={department.id}>
              <div
                onClick={() =>
                  showCategories(
                    department.frontmatter.name,
                    department.frontmatter.slug
                  )
                }
                className="deptName"
              >
                {department.frontmatter.name}
              </div>
            </div>
          ))}
          <a href={"/#footer"} onClick={routeToFooter}>
            <div className="deptName">NEED HELP?</div>
          </a>
        </div>
      </div>
      <div className="categoriesSlide">
        <div className="slideContents">
          <div onClick={clearSelectedDept} className="arrowContainer">
            <span></span>
            <span>BACK</span>
          </div>
          {selectedDept.name === "" ? null : (
            <SubNav
              deptName={selectedDept.name === "" ? null : selectedDept.name}
              deptSlug={selectedDept.slug === "" ? null : selectedDept.slug}
            />
          )}
        </div>
      </div>
    </>
  )

  const desktopContents = (
    <>
      {departments.map(department => (
        <Link
          onMouseEnter={() => onMouseEnterDept(department)}
          onMouseLeave={() => onMouseLeaveDept()}
          key={department.id}
          to={`/${department.frontmatter.slug}`}
        >
          <div
            className={`deptName ${
              hoveredDept.slug === department.frontmatter.slug
                ? "isHovered"
                : ""
            }`}
          >
            {department.frontmatter.name}
          </div>
        </Link>
      ))}
      <a href={"/#footer"}>
        <div className="deptName">NEED HELP?</div>
      </a>
    </>
  )

  const navMenu = (
    <div className={`navmenu ${slideToCategories ? "isSlid" : ""}`}>
      {windowDimensions.width < 800 ? mobileContents : desktopContents}
    </div>
  )

  const renderNavMenu = () => {
    return windowDimensions.width < 800 ? (
      <div
        className={`overlay ${isMenuOpen ? "isActive" : ""}`}
        onClick={e => closeMenu(e)}
      >
        <div
          ref={menuContainerRef}
          className={`mobileNavmenuWrapper ${isMenuOpen ? "isOpen" : ""}`}
        >
          {navMenu}
        </div>
      </div>
    ) : (
      <>{navMenu}</>
    )
  }

  return <>{renderNavMenu()}</>
}

export default NavMenu

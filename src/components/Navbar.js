import React, { useState, useEffect } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import {
  container,
  notDisplayed,
  dropdown,
  dropdownContents,
  isShown,
  overlay,
  overlayActive,
} from "../styles/navbar.module.css"
import NavMenu from "./NavMenu"
import Hamburger from "./Hamburger"
import SubNav from "./SubNav"
import useWindowDimensions from "../components/hooks/useWindowDimensions"
import useNavigationDisplay from "./hooks/useNavigationDisplay"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const [hoveredDept, setHoveredDept] = useState({
    showDropdown: false,
    name: "",
    slug: "",
  })
  const windowDimensions = useWindowDimensions()
  const isNavbarDisplayed = useNavigationDisplay()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    }

    if (!isMenuOpen) {
      document.body.style.overflow = "visible"
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (hoveredDept.showDropdown) {
      setIsDropdownShown(true)
    }
    if (!hoveredDept.showDropdown) {
      if (isDropdownShown) {
        setIsDropdownShown(false)
      }
    }
  }, [hoveredDept])

  useEffect(() => {
    if (isMenuOpen === true) {
      setIsMenuOpen(false)
    }
  }, [windowDimensions])

  const data = useStaticQuery(graphql`
    query NavbarComponent {
      siteData: site {
        siteMetadata {
          title
        }
      }

      departments: allMarkdownRemark(
        sort: { fields: frontmatter___placement, order: ASC }
        filter: { frontmatter: { contentType: { eq: "department" } } }
      ) {
        nodes {
          id
          frontmatter {
            department
            slug
            name
          }
        }
      }
    }
  `)

  const title = data.siteData.siteMetadata.title
  const departments = data.departments.nodes

  const updateIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const updateIsDropdownShown = () => {
    setIsDropdownShown(!isDropdownShown)
  }

  const updateHoveredDept = (showStatus, deptName, deptSlug) => {
    setHoveredDept({
      showDropdown: showStatus,
      name: deptName,
      slug: deptSlug,
    })
  }

  const renderNav = () => {
    return (
      <>
        <nav>
          <span>
            <Link to={"/"}>
              <h1>{title}</h1>
            </Link>
          </span>
          {windowDimensions.width < 800 ? (
            <Hamburger
              isMenuOpen={isMenuOpen}
              onIsMenuOpenChange={updateIsMenuOpen}
            />
          ) : null}
          <NavMenu
            onHoveredDeptChanged={updateHoveredDept}
            isMenuOpen={isMenuOpen}
            departmentDetails={departments}
          />
        </nav>
        <div
          className={dropdown}
          onMouseEnter={() =>
            setHoveredDept({ ...hoveredDept, showDropdown: true })
          }
          onMouseLeave={() =>
            setHoveredDept({ ...hoveredDept, showDropdown: false })
          }
        >
          <div
            className={`${dropdownContents} ${
              isDropdownShown ? `${isShown}` : ""
            }`}
          >
            {isDropdownShown ? (
              <SubNav
                deptName={null}
                deptSlug={hoveredDept.slug === "" ? null : hoveredDept.slug}
              />
            ) : null}
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={`${container} ${isNavbarDisplayed ? `` : `${notDisplayed}`}`}
    >
      {renderNav()}
      <div
        className={`${overlay} ${isMenuOpen ? `${overlayActive}` : ``}`}
        onClick={updateIsMenuOpen}
      ></div>
    </div>
  )
}

export default Navbar

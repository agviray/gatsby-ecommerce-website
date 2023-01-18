import React, { useState, useRef } from "react"
import {
  accordion,
  headingContainer,
  arrowContainer,
  arrow,
  bodyContainer,
} from "../styles/accordion.module.css"

const Accordion = ({ accordionContent }) => {
  const renderContent = content => {
    return (
      <div className={accordion}>
        <div className={headingContainer}>
          <h3>{content.headingText}</h3>
          <div className={arrowContainer}>
            <span className={arrow}></span>
          </div>
        </div>
        <div className={bodyContainer}>
          <p>{content.bodyText}</p>
        </div>
      </div>
    )
  }
  return <>{renderContent(accordionContent)}</>
}

export default Accordion

import React, { useState, useEffect, useRef } from "react"

const Accordion = ({ accordionContent }) => {
  const [isOpen, setIsOpen] = useState(false)
  const bodyTextRef = useRef(null)

  useEffect(() => {
    const bodyText = bodyTextRef.current
    const bodyTextScrollHeight = bodyText.scrollHeight

    if (isOpen) {
      bodyText.style.maxHeight = `${bodyTextScrollHeight}px`
    }

    if (!isOpen) {
      bodyText.style.maxHeight = ``
    }
  }, [isOpen])

  const renderContent = content => {
    return (
      <div className="accordion">
        <div onClick={() => setIsOpen(!isOpen)} className="headingContainer">
          <h3>{content.headingText}</h3>
          <div className="arrowContainer">
            <span className={`arrow ${isOpen ? "arrowActive" : ""}`}></span>
          </div>
        </div>
        <div ref={bodyTextRef} className="bodyContainer">
          <div className="content">
            {content.bodyTextWithLink ? (
              <>{content.bodyTextWithLink()}</>
            ) : (
              <p>{content.bodyText}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
  return <>{renderContent(accordionContent)}</>
}

export default Accordion

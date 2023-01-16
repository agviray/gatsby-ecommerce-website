import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import {
  container,
  heading,
  content,
  formContainer,
  formHeading,
  formContent,
  formItem,
  formLabel,
  formTextInput,
  formTextarea,
  submitButton,
} from "../styles/contact.module.css"

const Contact = () => {
  const sendMessage = e => {
    e.preventDefault()
  }

  const handleFormSubmit = e => {
    e.preventDefault()
  }
  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>CONTACT</h2>
        </div>
        <div className={content}>
          <div className={formContainer}>
            <form onSubmit={e => handleFormSubmit(e)}>
              <h3 className={formHeading}>SEND US A MESSAGE</h3>
              <div className={formContent}>
                <div className={formItem}>
                  <label className={formLabel} htmlFor="ContactFormName">
                    NAME
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormName"
                    placeholder="NAME"
                  />
                </div>
                <div className={formItem}>
                  <label className={formLabel} htmlFor="ContactFormEmail">
                    EMAIL
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormEmail"
                    placeholder="EMAIL"
                  />
                </div>
                <div className={formItem}>
                  <label className={formLabel} htmlFor="ContactFormPhone">
                    PHONE
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormPhone"
                    placeholder="PHONE"
                  />
                </div>
                <div className={formItem}>
                  <label className={formLabel} htmlFor="ContactFormMessage">
                    MESSAGE
                  </label>
                  <textarea
                    className={formTextarea}
                    rows="10"
                    id="ContactFormMessage"
                    placeholder="MESSAGE"
                  />
                </div>
                <input
                  type="submit"
                  value="SEND"
                  className={submitButton}
                  onClick={e => sendMessage(e)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

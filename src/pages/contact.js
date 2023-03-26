import React, { useState, useEffect } from "react"
import FormItem from "../components/FormItem"
import Layout from "../components/Layout"
import {
  container,
  heading,
  content,
  formContainer,
  formHeading,
  formContent,
  formItemWrapper,
  formLabel,
  formTextInput,
  formTextarea,
  submitButton,
} from "../styles/contact.module.css"
import useFormValidation from "../components/hooks/useFormValidation"

const Contact = () => {
  const { formValues, formErrors, updateFormValues, clearError } =
    useFormValidation()

  const sendMessage = e => {
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
            <form onSubmit={e => sendMessage(e)}>
              <h3 className={formHeading}>SEND US A MESSAGE</h3>
              <div className={formContent}>
                <div className={formItemWrapper}>
                  <FormItem
                    error={formErrors.name ? formErrors.name : null}
                    isErrorVisible={formErrors.name ? true : false}
                  >
                    <label className={formLabel} htmlFor="ContactFormName">
                      NAME
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      id="ContactFormName"
                      placeholder="NAME"
                      name="name"
                      value={formValues.name ? formValues.name : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={e => clearError(e)}
                      onBlur={e => updateFormValues(e)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem
                    error={formErrors.email ? formErrors.email : null}
                    isErrorVisible={formErrors.email ? true : false}
                  >
                    <label className={formLabel} htmlFor="ContactFormEmail">
                      EMAIL
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      id="ContactFormEmail"
                      placeholder="EMAIL"
                      name="email"
                      value={formValues.email ? formValues.email : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={e => clearError(e)}
                      onBlur={e => updateFormValues(e)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem
                    error={formErrors.phone ? formErrors.phone : null}
                    isErrorVisible={formErrors.phone ? true : false}
                  >
                    {" "}
                    <label className={formLabel} htmlFor="ContactFormPhone">
                      PHONE
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      maxLength={10}
                      id="ContactFormPhone"
                      placeholder="PHONE"
                      name="phone"
                      value={formValues.phone ? formValues.phone : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={e => clearError(e)}
                      onBlur={e => updateFormValues(e)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem
                    error={formErrors.message ? formErrors.message : null}
                    isErrorVisible={formErrors.message ? true : false}
                  >
                    <label className={formLabel} htmlFor="ContactFormMessage">
                      MESSAGE
                    </label>
                    <textarea
                      className={formTextarea}
                      rows="10"
                      id="ContactFormMessage"
                      placeholder="MESSAGE"
                      name="message"
                      value={formValues.message ? formValues.message : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={e => clearError(e)}
                      onBlur={e => updateFormValues(e)}
                    />
                  </FormItem>
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

import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
  checkoutWrapper,
  container,
  heading,
  content,
  contentBlock,
  flexFormContent,
  billingGrid,
  shippingGrid,
  paymentGrid,
  areaA,
  areaB,
  areaC,
  areaD,
  fieldsetStyle,
  legendStyle,
  formLabel,
  formTextInput,
  buttonContainer,
  submitButton,
  messageBox,
  modalButtonContainer,
  modalButton,
} from "../styles/checkout.module.css"
import { formContent } from "../styles/form.module.css"
import {
  breadcrumbsContainer,
  breadcrumbs,
  crumb,
} from "../styles/breadcrumbs.module.css"
import { BagContext } from "../components/BagContextComponent"
import Layout from "../components/Layout"
import FormItem from "../components/FormItem"
import OrderSummary from "../components/OrderSummary"
import Modal from "../components/Modal"
import useFormValidation from "../components/hooks/useFormValidation"

const Checkout = () => {
  const [items, setItems] = useState([])
  const [formStatus, setFormStatus] = useState({})
  const [displayModal, setDisplayModal] = useState(false)
  const { formValues, formErrors, updateFormValues, clearError, resetForm } =
    useFormValidation()

  useEffect(() => {
    if (Object.keys(formStatus).length === 0) {
      setDisplayModal(false)
    } else {
      setDisplayModal(true)
    }
  }, [formStatus])

  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    const storedItems = [...storedBag.items]

    if (storedBag) {
      if (items.length === 0) {
        setItems([...storedItems])
      }
    }
  }, [])

  const closeModal = e => {
    e.preventDefault()
    if (formStatus.hasErrors === true) {
      setFormStatus({})
    } else if (formStatus.hasErrors === false) {
      resetForm()
      setFormStatus({})
    }
  }

  const placeOrder = e => {
    e.preventDefault()

    if (Object.keys(formErrors).length !== 0) {
      setFormStatus({
        hasErrors: true,
        message: `Please review your information.`,
      })
    } else if (Object.keys(formValues).length < 11) {
      setFormStatus({
        hasErrors: true,
        message: `Please complete all form fields.`,
      })
    } else if (Object.keys(formErrors).length === 0) {
      setFormStatus({
        hasErrors: false,
        message: `Thank you for your order!`,
      })
    }
  }

  return (
    <div className={checkoutWrapper}>
      <Layout>
        <div className={container}>
          <div className={heading}>
            <h2>CHECKOUT</h2>
          </div>
          <div className={content}>
            <section>
              <div className={breadcrumbsContainer}>
                <ul className={breadcrumbs}>
                  <li className={crumb}>
                    <Link to="/bag">Shopping Bag</Link>
                  </li>
                  <li className={crumb}>Checkout</li>
                </ul>
              </div>
            </section>
            <section>
              <form onSubmit={e => placeOrder(e)}>
                <div className={`${formContent} ${flexFormContent}`}>
                  <div className={contentBlock}>
                    <fieldset className={fieldsetStyle}>
                      <legend className={legendStyle}>BILLING</legend>
                      <div className={billingGrid}>
                        <div className={areaA}>
                          <FormItem
                            error={formErrors.name ? formErrors.name : null}
                            isErrorVisible={formErrors.name ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormName"
                            >
                              NAME
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormName"
                              placeholder="NAME"
                              name="name"
                              value={formValues.name ? formValues.name : ""}
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaB}>
                          <FormItem
                            error={formErrors.email ? formErrors.email : null}
                            isErrorVisible={formErrors.email ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormEmail"
                            >
                              EMAIL
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormEmail"
                              placeholder="EMAIL"
                              name="email"
                              value={formValues.email ? formValues.email : ""}
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaC}>
                          <FormItem
                            error={formErrors.phone ? formErrors.phone : null}
                            isErrorVisible={formErrors.phone ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormPhone"
                            >
                              PHONE
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              maxLength={10}
                              id="CheckoutFormPhone"
                              placeholder="PHONE"
                              name="phone"
                              value={formValues.phone ? formValues.phone : ""}
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                      <legend className={legendStyle}>SHIPPING</legend>
                      <div className={shippingGrid}>
                        <div className={areaA}>
                          <FormItem
                            error={
                              formErrors.address ? formErrors.address : null
                            }
                            isErrorVisible={formErrors.address ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormAddress"
                            >
                              ADDRESS
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormAddress"
                              placeholder="ADDRESS"
                              name="address"
                              value={
                                formValues.address ? formValues.address : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaB}>
                          <FormItem
                            error={formErrors.city ? formErrors.city : null}
                            isErrorVisible={formErrors.city ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormCity"
                            >
                              CITY
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormCity"
                              placeholder="CITY"
                              name="city"
                              value={formValues.city ? formValues.city : ""}
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaC}>
                          <FormItem
                            error={formErrors.state ? formErrors.state : null}
                            isErrorVisible={formErrors.state ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormState"
                            >
                              COUNTRY
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              maxLength={2}
                              id="CheckoutFormState"
                              placeholder="STATE"
                              name="state"
                              value={formValues.state ? formValues.state : ""}
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaD}>
                          <FormItem
                            error={
                              formErrors.zipcode ? formErrors.zipcode : null
                            }
                            isErrorVisible={formErrors.zipcode ? true : false}
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormZipCode"
                            >
                              ZIP CODE
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              maxLength={5}
                              id="CheckoutFormZipCode"
                              placeholder="ZIP CODE"
                              name="zipcode"
                              value={
                                formValues.zipcode ? formValues.zipcode : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                      <legend className={legendStyle}>PAYMENT</legend>
                      <div className={paymentGrid}>
                        <div className={areaA}>
                          <FormItem
                            error={
                              formErrors.cardholder
                                ? formErrors.cardholder
                                : null
                            }
                            isErrorVisible={
                              formErrors.cardholder ? true : false
                            }
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormCCHolder"
                            >
                              CARD HOLDER NAME
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormCCHolder"
                              placeholder="CARD HOLDER"
                              name="cardholder"
                              value={
                                formValues.cardholder
                                  ? formValues.cardholder
                                  : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaB}>
                          <FormItem
                            error={
                              formErrors.cardnumber
                                ? formErrors.cardnumber
                                : null
                            }
                            isErrorVisible={
                              formErrors.cardnumber ? true : false
                            }
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormCCNumber"
                            >
                              CARD NUMBER
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              id="CheckoutFormCCNumber"
                              placeholder="CARD NUMBER"
                              name="cardnumber"
                              value={
                                formValues.cardnumber
                                  ? formValues.cardnumber
                                  : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaC}>
                          <FormItem
                            error={
                              formErrors.cardexpiry
                                ? formErrors.cardexpiry
                                : null
                            }
                            isErrorVisible={
                              formErrors.cardexpiry ? true : false
                            }
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormCCExpiryDate"
                            >
                              EXPIRY DATE
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              maxLength={4}
                              id="CheckoutFormCCExpiryDate"
                              placeholder="EXPIRATION DATE (MMYY)"
                              name="cardexpiry"
                              value={
                                formValues.cardexpiry
                                  ? formValues.cardexpiry
                                  : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                        <div className={areaD}>
                          <FormItem
                            error={
                              formErrors.cardsecuritycode
                                ? formErrors.cardsecuritycode
                                : null
                            }
                            isErrorVisible={
                              formErrors.cardsecuritycode ? true : false
                            }
                          >
                            <label
                              className={formLabel}
                              htmlFor="CheckoutFormCCSecurityCode"
                            >
                              CARD CVV/CSC
                            </label>
                            <input
                              className={formTextInput}
                              type="text"
                              maxLength={4}
                              id="CheckoutFormCCSecurityCode"
                              placeholder="CVV/CSC (CARD SECURITY CODE)"
                              name="cardsecuritycode"
                              value={
                                formValues.cardsecuritycode
                                  ? formValues.cardsecuritycode
                                  : ""
                              }
                              onChange={e => updateFormValues(e)}
                              onFocus={e => clearError(e)}
                              onBlur={e => updateFormValues(e)}
                            />
                          </FormItem>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div>
                    <BagContext.Consumer>
                      {value => <OrderSummary BagContext={value} />}
                    </BagContext.Consumer>
                    <div className={buttonContainer}>
                      <input
                        type="submit"
                        value="PLACE MY ORDER"
                        className={submitButton}
                        onClick={e => placeOrder(e)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Layout>
      <Modal activeStatus={displayModal}>
        <div className={messageBox}>
          <p>{formStatus.message}</p>
          <div className={modalButtonContainer}>
            <button onClick={e => closeModal(e)} className={modalButton}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Checkout

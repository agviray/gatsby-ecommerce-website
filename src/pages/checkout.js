import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
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

const Checkout = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const storedBag = JSON.parse(localStorage.getItem("bag"))
    const storedItems = [...storedBag.items]

    if (storedBag) {
      if (items.length === 0) {
        setItems([...storedItems])
      }
    }
  }, [])

  return (
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
            <form>
              <div className={`${formContent} ${flexFormContent}`}>
                <div className={contentBlock}>
                  <fieldset className={fieldsetStyle}>
                    <legend className={legendStyle}>BILLING</legend>
                    <div className={billingGrid}>
                      <div className={areaA}>
                        <FormItem isFieldValid={true}>
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
                          />
                        </FormItem>
                      </div>
                      <div className={areaB}>
                        <FormItem isFieldValid={true}>
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
                          />
                        </FormItem>
                      </div>
                      <div className={areaC}>
                        <FormItem isFieldValid={true}>
                          <label
                            className={formLabel}
                            htmlFor="CheckoutFormPhone"
                          >
                            PHONE
                          </label>
                          <input
                            className={formTextInput}
                            type="text"
                            id="CheckoutFormPhone"
                            placeholder="PHONE"
                          />
                        </FormItem>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className={fieldsetStyle}>
                    <legend className={legendStyle}>SHIPPING</legend>
                    <div className={shippingGrid}>
                      <div className={areaA}>
                        <FormItem isFieldValid={true}>
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
                          />
                        </FormItem>
                      </div>
                      <div className={areaB}>
                        <FormItem isFieldValid={true}>
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
                          />
                        </FormItem>
                      </div>
                      <div className={areaC}>
                        <FormItem isFieldValid={true}>
                          <label
                            className={formLabel}
                            htmlFor="CheckoutFormCountry"
                          >
                            COUNTRY
                          </label>
                          <input
                            className={formTextInput}
                            type="text"
                            id="CheckoutFormCountry"
                            placeholder="COUNTRY"
                          />
                        </FormItem>
                      </div>
                      <div className={areaD}>
                        <FormItem isFieldValid={true}>
                          <label
                            className={formLabel}
                            htmlFor="CheckoutFormZipCode"
                          >
                            ZIP CODE
                          </label>
                          <input
                            className={formTextInput}
                            type="text"
                            id="CheckoutFormZipCode"
                            placeholder="ZIP CODE"
                          />
                        </FormItem>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className={fieldsetStyle}>
                    <legend className={legendStyle}>PAYMENT</legend>
                    <div className={paymentGrid}>
                      <div className={areaA}>
                        <FormItem isFieldValid={true}>
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
                          />
                        </FormItem>
                      </div>
                      <div className={areaB}>
                        <FormItem isFieldValid={true}>
                          <label
                            className={formLabel}
                            htmlFor="CheckoutFormCCExpiryDate"
                          >
                            EXPIRY DATE
                          </label>
                          <input
                            className={formTextInput}
                            type="text"
                            id="CheckoutFormCCExpiryDate"
                            placeholder="MM/YY"
                          />
                        </FormItem>
                      </div>
                      <div className={areaC}>
                        <FormItem isFieldValid={true}>
                          <label
                            className={formLabel}
                            htmlFor="CheckoutFormCCCVV"
                          >
                            CARD CVV
                          </label>
                          <input
                            className={formTextInput}
                            type="text"
                            id="CheckoutFormCCCVV"
                            placeholder="CVV"
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
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout

import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="heading">
          <h2>CONTACT</h2>
        </div>
        <div className="content">
          <div className="formContainer">
            <form action="">
              <h3 className="formHeading">MESSAGE US</h3>
              <div className="formContent">
                <div className="formItem">
                  <label htmlFor="ContactFormName">NAME</label>
                  <input type="text" id="ContactFormName" placeholder="NAME" />
                </div>
                <div className="formItem">
                  <label htmlFor="ContactFormEmail">EMAIL</label>
                  <input
                    type="text"
                    id="ContactFormEmail"
                    placeholder="EMAIL"
                  />
                </div>
                <div className="formItem">
                  <label htmlFor="ContactFormPhone">PHONE</label>
                  <input
                    type="text"
                    id="ContactFormPhone"
                    placeholder="PHONE"
                  />
                </div>
                <div className="formItem">
                  <label htmlFor="ContactFormMessage">MESSAGE</label>
                  <textarea
                    rows="15"
                    id="ContactFormMessage"
                    placeholder="MESSAGE"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

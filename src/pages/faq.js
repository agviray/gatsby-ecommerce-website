import React, { useState, useEffect } from "react"
import { container, content, heading, body } from "../styles/faq.module.css"
import Layout from "../components/Layout"
import Accordion from "../components/Accordion"

const Faq = () => {
  const allFaqContent = [
    {
      headingText: "When will my order ship?",
      bodyText:
        "Orders will ship within 1-2 business days. A confirmation email will be sent once you place your order, and tracking information will be available within the next 24 hours. You can use the provided tracking number to obtain the estimated delivery date.",
    },
    {
      headingText: "What are your accepted payment types?",
      bodyText:
        "We accept Visa and MasterCard, American Express, Discover, and PayPal.",
    },
    {
      headingText: "Can I place orders over the phone?",
      bodyText:
        "Unfortunately, we do not accept orders placed over the phone. All orders must be placed online, through our website.",
    },
    {
      headingText: "How will my order ship?",
      bodyText:
        "We ship all of our orders via United States Postal Service, UPS, or FedEx. The carrier is determined by the weight of the package and its destination.",
    },
    {
      headingText: "Do you ship internationally?",
      bodyText:
        "Unfortunately, we do not offer international shipping at this time.",
    },
    {
      headingText: "How do I track my order?",
      bodyText:
        "You will receive a shipping notification email within 3 days from the date of your purchase. This email will contain tracking information that will determine the estimated delivery date of your order.",
    },
    {
      headingText: "How do I return an item?",
      bodyText: "You can start the return process by clicking here.",
    },
    {
      headingText: "Can I exchange my purchased item for a different size?",
      bodyText:
        "We will happily exchange your purchased item as long as we have your requested size in stock. Click here to start the exchange process.",
    },
    {
      headingText: "What should I do if I received the wrong item?",
      bodyText:
        "Please send us a message if you have received an incorrect item.",
    },
  ]
  return (
    <Layout>
      <div className={container}>
        <div className={content}>
          <div className={heading}>
            <h2>FAQ</h2>
          </div>
          <div className="body">
            {allFaqContent.map((content, index) => (
              <Accordion key={index} accordionContent={content} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Faq

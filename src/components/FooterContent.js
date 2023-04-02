import React from "react"
import { Link } from "gatsby"
import twitterIcon from "../images/social-media/twitter-icon.svg"
import instagramIcon from "../images/social-media/instagram-icon.svg"
import facebookIcon from "../images/social-media/facebook-icon.svg"
import {
  container,
  content,
  contentBlock,
  blockHeading,
  companyInfoContent,
  socialMediaContent,
  item,
  socialMediaIcon,
  iconContainer,
  siteCopyrightContent,
} from "../styles/footer-content.module.css"

const socialMediaIcons = [
  {
    src: twitterIcon,
    alt: "twitter icon",
    href: "https://www.twitter.com",
  },
  {
    src: instagramIcon,
    alt: "instagram icon",
    href: "https://www.instagram.com",
  },
  {
    src: facebookIcon,
    alt: "facebook icon",
    href: "https://www.facebook.com",
  },
]

const currentYear = new Date().getFullYear()

const FooterContent = ({ title }) => {
  return (
    <div id="footer" className={container}>
      <div className={content}>
        <div className={contentBlock}>
          <h4 className={blockHeading}>MORE INFO</h4>
          <div>
            <ul className={companyInfoContent}>
              <li className={item}>
                <Link to={"/contact"}>CONTACT</Link>
              </li>
              <li className={item}>
                <Link to={"/about"}>ABOUT</Link>
              </li>
              <li className={item}>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={contentBlock}>
          <h4 className={blockHeading}>GET CONNECTED</h4>
          <div>
            <ul className={socialMediaContent}>
              {socialMediaIcons.map(icon => (
                <li key={icon.alt} className={`${socialMediaIcon}`}>
                  <a href={icon.href} target="_blank" rel="noreferrer">
                    <span className={iconContainer}>
                      <img src={icon.src} alt={icon.alt} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={contentBlock}>
          <div className={siteCopyrightContent}>
            &copy; {currentYear} {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterContent

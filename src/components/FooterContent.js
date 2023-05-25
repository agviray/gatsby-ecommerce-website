import React from "react"
import { Link } from "gatsby"
import twitterIcon from "../images/social-media/twitter-icon.svg"
import instagramIcon from "../images/social-media/instagram-icon.svg"
import facebookIcon from "../images/social-media/facebook-icon.svg"

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
    <section>
      <div id="footer" className="footerContent">
        <div className="content">
          <div className="contentBlock">
            <article>
              <h4 className="heading">MORE INFO</h4>
              <div>
                <ul className="companyInfo">
                  <li className="item">
                    <Link to={"/about"}>ABOUT</Link>
                  </li>
                  <li className="item">
                    <a href="/faq">FAQ</a>
                  </li>
                  <li className="item">
                    <Link to={"/contact"}>CONTACT</Link>
                  </li>
                </ul>
              </div>
            </article>
          </div>
          <div className="contentBlock">
            <article>
              <h4 className="heading">GET CONNECTED</h4>
              <div>
                <ul className="socialMedia">
                  {socialMediaIcons.map(icon => (
                    <li key={icon.alt} className="icon">
                      <a href={icon.href} target="_blank" rel="noreferrer">
                        <span className="imgContainer">
                          <img src={icon.src} alt={icon.alt} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <div className="contentBlock">
            <article>
              <div className="copyright">
                &copy; {currentYear} {title}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterContent

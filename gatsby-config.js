/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/src/categories/`,
      },
    },
  ],
  siteMetadata: {
    title: "Online Store",
    description: "online clothing store",
    copyright: "This website is copyright 2022 Online Store",
  },
}

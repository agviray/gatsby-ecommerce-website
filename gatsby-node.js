const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      products: allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  data.products.nodes.forEach(node => {
    actions.createPage({
      path: `/collections/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/category-products.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

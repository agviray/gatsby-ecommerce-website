const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      categoryProducts: allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "category products" } } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  data.categoryProducts.nodes.forEach(node => {
    actions.createPage({
      path: `/collections/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/category-products.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

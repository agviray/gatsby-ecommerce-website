const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query Categories {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.nodes.forEach(node => {
    actions.createPage({
      path: `/collections/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/category-details.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

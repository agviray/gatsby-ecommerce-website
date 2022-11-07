const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      department: allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "department" } } }
      ) {
        nodes {
          frontmatter {
            department
            slug
            contentType
          }
        }
      }
      categoryProducts: allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "category products" } } }
      ) {
        nodes {
          frontmatter {
            slug
            department
          }
        }
      }
      productDetails: allMarkdownRemark(
        filter: { frontmatter: { contentType: { eq: "product details" } } }
      ) {
        nodes {
          frontmatter {
            type
            slug
          }
        }
      }
    }
  `)

  data.department.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/department.js"),
      context: {
        slug: node.frontmatter.slug,
        department: node.frontmatter.department,
      },
    })
  })
  // - Create pages for each collection of products, ie a
  //   page that displays all accessories.
  data.categoryProducts.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.frontmatter.department}/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/category-products.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })

  // - Create pages for each individual product.
  data.productDetails.nodes.forEach(node => {
    actions.createPage({
      path: `/department/${node.frontmatter.type}/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/product-details.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

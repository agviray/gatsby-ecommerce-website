const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allDepartments: allMarkdownRemark(
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
            department
            type
            slug
          }
        }
      }
    }
  `)

  // - Creates a department page, ie a page displaying the
  //   available categories under the Home Goods department.
  data.allDepartments.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/department.js"),
      context: {
        slug: node.frontmatter.slug,
        department: node.frontmatter.department,
      },
    })
  })
  // - Creates a page for each collection of products under a specific
  //   category, ie a page that displays all Men's Outerwear.
  data.categoryProducts.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.frontmatter.department}/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/category-products.js"),
      context: {
        slug: node.frontmatter.slug,
        department: node.frontmatter.department,
      },
    })
  })

  // - Creates a page that displays a single product's details, ie
  //   a page showing the description, price, etc of a single product.
  data.productDetails.nodes.forEach(node => {
    actions.createPage({
      path: `/${node.frontmatter.department}/${node.frontmatter.type}/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/product-details.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

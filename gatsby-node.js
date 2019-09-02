const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const SolutionTemplate = path.resolve(`src/templates/SolutionTemplate.js`)
  const ServicesTemplate = path.resolve(`src/templates/ServicesTemplate.js`)

  return new Promise((resolve, reject) => {
    resolve(
      // Create solution pages
      graphql(
        `
          {
            allContentfulSolution {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const solutions = result.data.allContentfulSolution.edges
        solutions.forEach((solution) => {
          if (solution.node.slug === 'professional') {
            createPage({
              path: `/services/${solution.node.slug}`,
              component: ServicesTemplate,
              context: {
                slug: solution.node.slug
              },
            })
          } else {
            createPage({
              path: `/solutions/${solution.node.slug}`,
              component: SolutionTemplate,
              context: {
                slug: solution.node.slug
              },
            })
          }
        })
      })
    )
  })
}
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createExhibitPages(pathPrefix, graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityExhibit(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const exhibitEdges = (result.data.allSanityExhibit || {}).edges || []
  exhibitEdges
    // .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug } = edge.node
      const path = `${pathPrefix}/${slug.current}/`
      reporter.info(`Creating exhibit page: ${path}`)
      createPage({
        path,
        component: require.resolve("./src/templates/exhibit.js"),
        context: { id },
      })
    })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  //await createLandingPages("/", graphql, actions, reporter)
  await createExhibitPages("/exhibits", graphql, actions, reporter)
}

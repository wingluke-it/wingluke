/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { endOfYesterday } = require("date-fns")

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

async function createEventPages(pathPrefix, graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityEvent(filter: { slug: { current: { ne: null } } }) {
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

  const eventEdges = (result.data.allSanityEvent || {}).edges || []
  eventEdges
    // .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug } = edge.node
      const path = `${pathPrefix}/${slug.current}/`
      reporter.info(`Creating event page: ${path}`)
      createPage({
        path,
        component: require.resolve("./src/templates/event.js"),
        context: { id },
      })
    })
}

async function createTourPages(pathPrefix, graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityTour(filter: { slug: { current: { ne: null } } }) {
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

  const tourEdges = (result.data.allSanityTour || {}).edges || []
  tourEdges
    // .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug } = edge.node
      const path = `${pathPrefix}/${slug.current}/`
      reporter.info(`Creating tour page: ${path}`)
      createPage({
        path,
        component: require.resolve("./src/templates/tour.js"),
        context: { id },
      })
    })
}

function createCalendarPages(actions, reporter) {
  const { createPage } = actions

  const calendarData = [
    {
      path: "tours",
      title: "Tours",
    },
    {
      path: "events",
      title: "Events",
    },
  ]

  calendarData.forEach(calendar => {
    reporter.info(
      `Creating ${calendar.title} calendar page: /${calendar.path}/`
    )
    createPage({
      path: `/${calendar.path}`,
      component: require.resolve(`./src/templates/${calendar.path}.js`),
      context: {
        currentDate: endOfYesterday().toISOString(),
      },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  //await createLandingPages("/", graphql, actions, reporter)
  await createExhibitPages("/exhibits", graphql, actions, reporter)
  await createEventPages("/events", graphql, actions, reporter)
  await createTourPages("/tours", graphql, actions, reporter)

  createCalendarPages(actions, reporter)
}

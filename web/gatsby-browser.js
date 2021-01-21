/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require("react")
const Layout = require("./src/components/layout").default
// const smoothscroll = require("smoothscroll-polyfill")

exports.onRouteUpdate = ({ location, prevLocation }) => {
  // console.log("new pathname", location.pathname)
  // console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

/* exports.onClientEntry = () => {
  smoothscroll.polyfill()
} */

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}

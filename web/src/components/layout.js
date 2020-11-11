/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import styles from "./layout.module.scss"

// GLOBAL STYLES
import "../styles/global.scss"

const Layout = ({ children }) => {
  /* const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `) */

  return (
    // id'ing this as "root" for MutationObserver in contatinerWithToc.js
    <div id="root" className={styles.layoutContainer}>
      {/* TODO <a href="#main-content">Jump to Main Content</a> */}
      <Header
        siteTitle="WING LUKE MUSEUM" /* siteTitle={data.site.siteMetadata.title} */
      />
      <main>
        {/* TODO <a id="main-content"></a> */}
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

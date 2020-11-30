/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

// GLOBAL STYLES
import "../styles/global.scss"

import React, { useEffect, useRef, useState } from "react"

import Footer from "./footer"
import MomaHeader from "./momaHeader"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./layout.module.scss"
// import { useStaticQuery, graphql } from "gatsby"



let lastKnownScrollPosition = 0
let previousScrollPos = 0
// let minScrollDelta = 5
let ticking = false

const Layout = ({ children }) => {
  const [headerIsOpen, setHeaderIsOpen] = useState(false)
  const toggleHeader = () => {
    setHeaderIsOpen(!headerIsOpen)
    if (!headerIsOpen) {
      // const scrollY = document.documentElement.style.getPropertyValue(
      //   "--scroll-y"
      // )
      const body = document.body
      body.style.overflow = "hidden"
      // body.style.position = "fixed"
      // body.style.top = `-${scrollY}`
    } else {
      const body = document.body
      body.style.overflow = "auto"
      // const scrollY = body.style.top
      // body.style.position = ""
      // body.style.top = ""
      // window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }

  const [headerIsShown, setHeaderIsShown] = useState(true)

  const layoutContainer = useRef(null)

  const adjustHeader = scrollPos => {
    if (!layoutContainer.current) {
      return
    }
    let headerHeight = getComputedStyle(
      layoutContainer.current
    ).getPropertyValue("--header-height")
    headerHeight = headerHeight.substring(0, headerHeight.length - 3)
    headerHeight =
      parseFloat(headerHeight) *
      parseFloat(getComputedStyle(document.documentElement).fontSize)

    if (scrollPos === 0 && !headerIsShown) {
      setHeaderIsShown(true)
    } else if (scrollPos > headerHeight) {
      const maxScrollDelta = window.innerHeight / 5
      const minScrollDelta = window.innerHeight / 100
      if (
        !headerIsShown &&
        scrollPos < previousScrollPos - minScrollDelta &&
        scrollPos + maxScrollDelta > previousScrollPos // if we're scrolling from more than 100px down, we're likely jumping using a hashtag ToC link, in which case, the header should not be shown
      ) {
        // scrolling up
        setHeaderIsShown(true)
      } else if (
        headerIsShown &&
        (scrollPos > previousScrollPos + minScrollDelta ||
          previousScrollPos - scrollPos > maxScrollDelta)
      ) {
        // scrolling down OR jumping up more than 100px using a hashtag toc link
        setHeaderIsShown(false)
      }
    }

    previousScrollPos = scrollPos
  }

  const handleScroll = event => {
    lastKnownScrollPosition = window.scrollY

    if (!ticking) {
      window.requestAnimationFrame(function () {
        adjustHeader(lastKnownScrollPosition)
        ticking = false
      })

      ticking = true
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return (
    <div
      ref={layoutContainer}
      className={classNames(styles.layoutContainer, {
        [styles.headerIsShown]: headerIsShown,
        [styles.headerIsOpen]: headerIsOpen,
        // [styles.scrolledPastHeaderHeight]: scrolledPastHeaderHeight,
      })}
    >
      {/* TODO <a href="#main-content">Jump to Main Content</a> */}
      <MomaHeader headerIsOpen={headerIsOpen} toggleHeader={toggleHeader} />
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

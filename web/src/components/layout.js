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
import { IconContext } from "@react-icons/all-files"
import MomaHeader from "./momaHeader"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./layout.module.scss"

// import { useStaticQuery, graphql } from "gatsby"

let previousScrollPos = 0
let lastDownPos = 0
let lastUpPos = 0
// let minScrollDelta = 5
let ticking = false
let maxHeaderHeight = 0
const maxScrollDelta = 100
// const minScrollDelta = 5 // window.innerHeight / 100 uhh this was unnecessary

const Layout = ({ children }) => {
  const headerElement = useRef(null)
  const [headerIsOpen, setHeaderIsOpen] = useState(false)
  const closeHeader = () => {
    if (headerIsOpen) {
      setHeaderIsOpen(false)
      const body = document.body
      body.style.overflow = "auto"
      headerElement.current.scrollTop = 0
    }
  }
  const toggleHeader = () => {
    const body = document.body
    if (!headerIsOpen) {
      // const scrollY = document.documentElement.style.getPropertyValue(
      //   "--scroll-y"
      // )
      body.style.overflow = "hidden"
      // body.style.position = "fixed"
      // body.style.top = `-${scrollY}`
    } else {
      body.style.overflow = "auto"
      // headerElement.current.scrollTop = 0

      // const scrollY = body.style.top
      // body.style.position = ""
      // body.style.top = ""
      // window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
    setHeaderIsOpen(!headerIsOpen)
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
    if (maxHeaderHeight === 0) maxHeaderHeight = headerHeight * 2

    if (scrollPos <= maxHeaderHeight && !headerIsShown) {
      setHeaderIsShown(true)
    } else {
      if (scrollPos < previousScrollPos /* - minScrollDelta */ /*  */) {
        // scrolling up
        lastUpPos = scrollPos
        if (
          !headerIsShown &&
          lastUpPos < lastDownPos - maxHeaderHeight &&
          scrollPos + maxScrollDelta > previousScrollPos // if we're scrolling from more than 100px down, we're likely jumping using a hashtag ToC link, in which case, the header should not be shown
        ) {
          setHeaderIsShown(true)
        } else if (
          headerIsShown &&
          scrollPos + maxScrollDelta < previousScrollPos
        ) {
          setHeaderIsShown(false)
        }
      } else if (scrollPos > previousScrollPos /* + minScrollDelta */ /*  */) {
        lastDownPos = scrollPos
        if (
          (headerIsShown && lastDownPos > lastUpPos + maxHeaderHeight) ||
          previousScrollPos - scrollPos > maxScrollDelta
        ) {
          // scrolling down OR jumping up more than 100px using a hashtag toc link
          setHeaderIsShown(false)
        }
      }
    }

    previousScrollPos = scrollPos
  }

  const handleScroll = event => {
    if (!ticking && !headerIsOpen) {
      window.requestAnimationFrame(function () {
        adjustHeader(window.scrollY)
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
      })}
    >
      <IconContext.Provider
        value={{ size: "1.1rem", style: { verticalAlign: "middle" } }}
      >
        {/* TODO <a href="#main-content">Jump to Main Content</a> */}
        <MomaHeader
          closeHeader={closeHeader}
          headerIsOpen={headerIsOpen}
          toggleHeader={toggleHeader}
          ref={headerElement}
        />
        <main
          className={classNames({ [styles.visibilityHidden]: headerIsOpen })}
        >
          {/* TODO <a id="main-content"></a> */}
          {children}
        </main>
        <Footer />
      </IconContext.Provider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

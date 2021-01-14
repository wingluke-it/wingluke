// GLOBAL STYLES
import "../styles/global.scss"

import React, { useCallback, useEffect, useRef, useState } from "react"

import Footer from "./footer"
import { IconContext } from "@react-icons/all-files"
import MomaHeader from "./momaHeader"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./layout.module.scss"

let previousScrollPos = 0
let lastDownPos = 0
let lastUpPos = 0
let ticking = false
let maxHeaderHeight = 0

const Layout = ({ children, location }) => {
  const [headerIsOpen, setHeaderIsOpen] = useState(false)
  const closeHeader = () => {
    if (headerIsOpen) {
      setHeaderIsOpen(false)
      const body = document.body
      body.style.overflow = "auto"
    }
  }
  const toggleHeader = () => {
    const body = document.body
    if (!headerIsOpen) {
      body.style.overflow = "hidden"
    } else {
      body.style.overflow = "auto"
    }
    setHeaderIsOpen(!headerIsOpen)
  }

  const [headerIsShown, setHeaderIsShown] = useState(true)

  const layoutContainer = useRef(null)

  const adjustHeader = useCallback(
    scrollPos => {
      if (!layoutContainer.current) {
        return
      }

      let headerHeight = getComputedStyle(
        layoutContainer.current
      ).getPropertyValue("--header-max-room")
      headerHeight = headerHeight.substring(0, headerHeight.length - 3)
      headerHeight =
        parseFloat(headerHeight) *
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      if (maxHeaderHeight === 0) maxHeaderHeight = headerHeight

      if (scrollPos <= maxHeaderHeight && !headerIsShown) {
        setHeaderIsShown(true)
      } else {
        if (scrollPos < previousScrollPos) {
          // scrolling up
          lastUpPos = scrollPos
          if (!headerIsShown && lastUpPos < lastDownPos - maxHeaderHeight) {
            setHeaderIsShown(true)
          }
        } else if (scrollPos > previousScrollPos) {
          // scrolling down
          lastDownPos = scrollPos
          if (headerIsShown && lastDownPos > lastUpPos + maxHeaderHeight) {
            // header is shown and we've scrolled down more than the height of the header from the last up scroll position
            setHeaderIsShown(false)
          }
        }
      }

      previousScrollPos = scrollPos
    },
    [headerIsShown]
  )

  const handleScroll = useCallback(() => {
    if (!ticking && !headerIsOpen) {
      window.requestAnimationFrame(() => {
        adjustHeader(window.scrollY)
        ticking = false
      })

      ticking = true
    }
  }, [adjustHeader, headerIsOpen])

  useEffect(() => {
    lastUpPos = window.scrollY
    lastDownPos = window.scrollY
    // TODO small bug is that this doesn't run when a user clicks the ToC link that they're already on, so sometimes the header is not hidden when it should be
    if (location.hash && window.scrollY > 0) {
      setHeaderIsShown(false)
    }
  }, [location.hash])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

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

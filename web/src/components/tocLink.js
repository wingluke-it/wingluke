import React, { useState, useEffect } from "react"
import classNames from "classnames"
import styles from "./tocLink.module.scss"

/*
 * https://medium.com/the-coders-guide-to-javascript/smooth-scrolling-anchor-menu-in-reactjs-175030d0bce2
 * A single menu item
 * I deconstruct props to provide more readable code, allowing
 * any future coders to see exactly what props are expected
 */
const TocLink = ({ id, children, active }) => {
  /*
   * Store our anchorTarget in state
   * We do not set it here, preferring to wait for after the component
   * is mounted to avoid any errors
   */
  const [anchorTarget, setAnchorTarget] = useState(null)

  /*
   * When the component mounts and/or updates, set our AnchorTarget based
   * on the itemName
   */
  useEffect(() => {
    setAnchorTarget(document.getElementById(id))
  }, [id])

  /*
   * Where all the magic happens -- scrollIntoView on click
   */
  const handleClick = event => {
    event.preventDefault()
    // would be nice for yOffset to be set based on sass variable, but this will do for now
    const yOffset = -100
    const y =
      anchorTarget.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
    // anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  /*
   * Return the TocLink as JSX
   * Remember to set your ariaLabel for accessibility!
   */
  return (
    <li>
      <a
        href={`#${id}`}
        className={classNames({ [styles.active]: active })}
        onClick={handleClick}
        aria-label={`Scroll to ${id}`}
      >
        {children}
      </a>
    </li>
  )
}

export default TocLink

import React, { useState, useEffect /*, useRef */ } from "react"
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

  // const aElement = useRef(null)
  /*
   * When the component mounts and/or updates, set our AnchorTarget based
   * on the itemName
   */
  useEffect(() => {
    // setAnchorTarget(aElement)
    setAnchorTarget(document.getElementById(id))
  }, [id])

  /*
   * Where all the magic happens -- scrollIntoView on click
   */
  const handleClick = event => {
    event.preventDefault()
    // would be nice for yOffset to be set based on sass variable, but this will do for now
    const yOffset = -50
    const y =
      anchorTarget.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
    // anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  /*
   * Return the TocLink as JSX
   * Remember to set your aria-label for accessibility!
   */
  return (
    <li className={classNames({ [styles.active]: active }, styles.li)}>
      <a
        // ref={aElement}
        href={`#${id}`}
        onClick={handleClick}
        aria-label={`Scroll to ${id}`}
      >
        {children}
      </a>
    </li>
  )
}

export default TocLink

import React, { useState } from "react"

import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown"
import { AiFillCaretLeft } from "@react-icons/all-files/ai/AiFillCaretLeft"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./menuNav.module.scss"
import { useMediaQuery } from "react-responsive"

const MenuNav = ({ breakpoint, navItems, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const isCollapsible = useMediaQuery(
    { maxWidth: breakpoint },
    undefined,
    matches => setIsCollapsed(matches)
  )

  return (
    <div
      className={classNames(styles.container, {
        [styles.navShown]: !isCollapsed || !isCollapsible,
      })}
    >
      {isCollapsible ? (
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <span>
            More from <strong>{title}</strong>{" "}
          </span>
          {isCollapsed ? <AiFillCaretLeft /> : <AiFillCaretDown />}
        </button>
      ) : (
        <span className={classNames("h4", styles.navTitle)}>{title}</span>
      )}
      {/* {(!isCollapsed || !isCollapsible) && ( */}
      <nav>
        <ul>
          {navItems.map(({ to, text }, index) => (
            <li key={index}>
              <Link
                to={to}
                partiallyActive={false}
                activeClassName={styles.activeLink}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* )} */}
    </div>
  )
}

MenuNav.propTypes = {
  breakpoint: PropTypes.number.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      // importance: PropTypes.oneOf(["primary", "secondary"])
      // isExternal: PropTypes.bool
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default MenuNav

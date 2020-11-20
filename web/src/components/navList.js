import React from "react"
import styles from "./navList.module.scss"

const NavList = ({ listItems, ...restProps }) => (
  <nav className={styles.nav} {...restProps}>
    <ul className={styles.list}>{listItems}</ul>
  </nav>
)

export default NavList

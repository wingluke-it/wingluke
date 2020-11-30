import React from "react"
import styles from "./navList.module.scss"

const NavList = ({ listItems }) => (
  <nav className={styles.nav}>
    <ul className={styles.list}>{listItems}</ul>
  </nav>
)

export default NavList

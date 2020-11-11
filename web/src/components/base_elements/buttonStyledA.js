import React from "react"
import styles from "./buttonStyled.module.scss"

const ButtonStyledA = ({ text, href, newtab = true }) =>
  newtab ? (
    <a
      href={href}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  ) : (
    <a className={styles.button} href={href}>
      {text}
    </a>
  )

export default ButtonStyledA

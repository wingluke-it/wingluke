import React from "react"
import styles from "./button.module.scss"

const ButtonStyledA = ({ text, href, newtab = true }) =>
  newtab ? (
    <a
      href={href}
      className={styles.buttonStyled}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  ) : (
    <a className={styles.buttonStyled} href={href}>
      {text}
    </a>
  )

export default ButtonStyledA

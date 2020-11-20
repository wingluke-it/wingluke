import React from "react"
import { Link } from "gatsby"
import styles from "./button.module.scss"

const ButtonStyledLink = ({ text, to }) => (
  <Link className={styles.buttonStyled} to={to}>
    {text}
  </Link>
)

export default ButtonStyledLink

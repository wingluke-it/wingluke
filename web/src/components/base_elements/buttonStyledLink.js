import React from "react"
import { Link } from "gatsby"
import styles from "./buttonStyled.module.scss"

const ButtonStyledLink = ({ text, to }) => (
  <Link className={styles.button} to={to}>
    {text}
  </Link>
)

export default ButtonStyledLink

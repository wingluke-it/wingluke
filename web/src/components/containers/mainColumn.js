import React from "react"
import styles from "./mainColumn.module.scss"

const MainColumn = ({ children }) => (
  <div className={styles.mainColumn}>{children}</div>
)

export default MainColumn

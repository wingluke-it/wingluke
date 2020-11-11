import React from "react"
import styles from "./containerWithSidebar.module.scss"

const ContainerWithSidebar = ({ sidebarContent, children }) => (
  <div className={styles.root}>
    {/* TODO should this be an <aside>?*/}
    <div className={styles.mainContent}>{children}</div>
    <div className={styles.sidebar}>{sidebarContent}</div>{" "}
  </div>
)

export default ContainerWithSidebar

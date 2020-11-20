import React from "react"
import styles from "./containerWithSidebar.module.scss"

const ContainerWithSidebar = ({
  sidebarContentLeft,
  sidebarContentRight,
  children,
}) => (
  <div className={styles.root}>
    {/* TODO should this be an <aside>?*/}
    <div className={styles.sidebarleft}>{sidebarContentLeft}</div>
    <div className={styles.mainContent}>{children}</div>
    <div className={styles.sidebarright}>{sidebarContentRight}</div>
  </div>
)

export default ContainerWithSidebar

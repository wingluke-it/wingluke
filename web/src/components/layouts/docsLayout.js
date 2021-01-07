import PropTypes from "prop-types"
import React /* , { useState } */ from "react"
import classNames from "classnames"
import styles from "./docsLayout.module.scss"

const DocsLayout = ({ sidebar, main, hideSidebarAtBreakpoint = false }) => {
  // const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.grid}>
      <div
        className={classNames(styles.sidebar, {
          [styles.hideSidebarAtBreakpoint]: hideSidebarAtBreakpoint,
        })}
      >
        {sidebar}
      </div>
      <div className={styles.main}>{main}</div>
      {/* <button className={styles.button}></button>{[styles.*/}
    </div>
  )
}

DocsLayout.propTypes = {
  hideSidebarAtBreakpoint: PropTypes.bool,
}

export default DocsLayout

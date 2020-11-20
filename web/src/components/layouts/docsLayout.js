import React /* , { useState } */ from "react"

import styles from "./docsLayout.module.scss"

const DocsLayout = ({ sidebar, main }) => {
  // const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.grid}>
      <div className={styles.main}>{main}</div>
      <div className={styles.sidebar}>{sidebar}</div>
      {/* <button className={styles.button}></button> */}
    </div>
  )
}

export default DocsLayout

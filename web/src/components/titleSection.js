import React from "react"

import styles from "./titleSection.module.scss"

const TitleSection = ({ title, subtitle, beforeText, after }) => (
  <>
    <header className={styles.header}>
      {beforeText && <p>{beforeText}</p>}
      <h1 className={!beforeText ? styles.noBeforeText : undefined}>
        {title || "Untitled Exhibit"}
      </h1>
      {subtitle && (
        <p className={`h2 subtitle ${styles.subtitle}`}>{subtitle}</p>
      )}
      {after}
    </header>
    {/* <hr /> */}
  </>
)

export default TitleSection

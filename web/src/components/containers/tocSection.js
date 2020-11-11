import React from "react"
import styles from "./tocSection.module.scss"
import classNames from "classnames"

// Table of Contents Section
const TocSection = ({ children, headingText, id }) => (
  <section className={styles.tocSection} id={id}>
    <h2 className={classNames("h3", { [styles.hiddenOnDesktop]: false })}>
      {headingText}
    </h2>
    {children}
  </section>
)

export default TocSection

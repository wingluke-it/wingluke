import React from "react"

import DocsLayout from "./layouts/docsLayout"
import VisitNav from "./visitNav"

import styles from "./visitLayout.module.scss"

const VisitLayout = ({ children }) => (
  <DocsLayout
    hideSidebarAtBreakpoint={false}
    main={<article className={styles.article}>{children}</article>}
    sidebar={<VisitNav />}
  />
)

export default VisitLayout

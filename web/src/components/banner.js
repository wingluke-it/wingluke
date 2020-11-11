import React from "react"
import Figure from "./figure"

import styles from "./banner.module.scss"

const Banner = ({ figure }) => (
  <Figure
    figure={figure}
    dimensions={1 / 4}
    displayCaption={false}
    className={styles.banner}
  />
)

export default Banner

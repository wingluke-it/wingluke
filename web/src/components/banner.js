import Figure from "./figure"
import React from "react"
import styles from "./banner.module.scss"
import { useMediaQuery } from "react-responsive"

const Banner = ({ figure }) => {
  // TODO this method of responsive banners isn't ideal, because it's grabbing three separate images i think
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)",
  })
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  })
  let dimensions
  let width
  if (isMobile) {
    dimensions = 9 / 16
    width = 425
  } else if (isTablet) {
    dimensions = 1 / 3
    width = 768
  } else {
    dimensions = 1 / 4
    width = 1200
  }
  return (
    <Figure
      figure={figure}
      dimensions={dimensions}
      width={width}
      displayCaption={false}
      className={styles.banner}
    />
  )
}

export default Banner

import React from "react"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import styles from "./figure.module.css"

const Figure = ({ figure, width = 1200, dimensions = 9 / 16 }) => {
  const imgUrl =
    figure &&
    figure.asset &&
    imageUrlFor(buildImageObj(figure))
      .width(width)
      .height(Math.floor(dimensions * width))
      .fit("crop")
      .auto("format")
      .url()
  return imgUrl ? (
    <figure className={styles.figure}>
      <img
        className={styles.image}
        src={imgUrl}
        alt={figure.alt && figure.alt.en}
        title={figure.caption && figure.caption.en}
      />
      {figure.caption && figure.caption.en && (
        <figcaption className={styles.caption}>
          <em>{figure.caption.en}</em>
        </figcaption>
      )}
    </figure>
  ) : (
    <></>
  )
}

export default Figure

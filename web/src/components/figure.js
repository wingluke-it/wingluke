import React from "react"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import styles from "./figure.module.scss"
import classNames from "classnames"

const Figure = ({
  figure,
  displayCaption = true,
  width = 1200,
  dimensions = 9 / 16,
  className,
}) => {
  const height = Math.floor(dimensions * width)
  const imgUrl =
    figure &&
    figure.asset &&
    imageUrlFor(buildImageObj(figure))
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url()
  return imgUrl ? (
    <figure className={classNames(styles.figure, className)}>
      <img
        className={styles.image}
        src={imgUrl}
        alt={figure.alt_en}
        title={figure.caption_en}
        width={width}
        height={height}
      />
      {displayCaption && figure.caption_en && (
        <figcaption className={styles.caption_en}>
          <em>{figure.caption_en}</em>
        </figcaption>
      )}
    </figure>
  ) : (
    <></>
  )
}

export default Figure

import React from "react"
import { buildImageObj } from "../lib/helpers"
import classNames from "classnames"
import { imageUrlFor } from "../lib/image-url"
import styles from "./figure.module.scss"

const Figure = ({
  figure,
  displayCaption = false,
  width = 1200, // default width
  dimensionset = [], // example: [{ w: 1600, d: 9 / 16 }]
  dimensions = 9 / 16, // default dimension
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
  const imgUrls = {}
  // let largestWidth = 0
  figure?.asset &&
    dimensionset.forEach(({ w, d }) => {
      // if (w > largestWidth) largestWidth = w
      const h = Math.floor(w * d)
      imgUrls[w] = imageUrlFor(buildImageObj(figure))
        .width(w)
        .height(h)
        .fit("crop")
        .auto("format")
        .url()
    })
  let srcset = ""
  let sizes = "100vw"
  Object.keys(imgUrls)
    .sort((a, b) => a - b)
    .forEach(w => {
      srcset += `${imgUrls[w]} ${w}w, `
      // sizes += `(max-width: ${w * 2}px) ${w}px, `
    })
  // sizes += `${largestWidth}px`
  /* const sizes = largestWidth
    ? `(min-width: ${largestWidth}px) ${largestWidth}px, 100vw`
    : null */

  return imgUrl ? (
    <figure className={classNames(styles.figure, className)}>
      <img
        className={styles.image}
        src={imgUrl}
        srcSet={srcset || null}
        sizes={srcset ? sizes : null}
        alt={figure.alt_en}
        title={figure.caption_en}
        // width={width}
        // height={height}
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

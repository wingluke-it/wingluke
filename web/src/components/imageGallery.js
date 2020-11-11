import React, { useState, useCallback } from "react"
import Gallery from "react-photo-gallery"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css" // TODO this only needs to be imported once in the whole app, not each time this component is used. so move this line to layout.js?
import styles from "./imageGallery.module.scss"

const ImageGallery = ({ imageGallery }) => {
  const [currentImageIndex, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  /* TODO http://neptunian.github.io/react-photo-gallery/srcset-and-sizes.html
  It's recommended that you always make use of native image attributes srcSet and sizes. 
  Pass these as as a string or array of the same name to each object in the photos property. */
  const images =
    imageGallery &&
    imageGallery.length > 0 &&
    imageGallery.map(image => {
      let imageWidth = image.asset.metadata.dimensions.width
      if (image.crop) imageWidth *= 1 - image.crop.right - image.crop.left
      let imageHeight = image.asset.metadata.dimensions.height
      if (image.crop) imageHeight *= 1 - image.crop.top - image.crop.bottom
      return {
        src: imageUrlFor(buildImageObj(image)).fit("crop").auto("format").url(),
        width: imageWidth,
        height: imageHeight,
        alt: image.alt && image.alt.en,
      }
    })

  return (
    <div className={styles.gallery}>
      <Gallery photos={images} onClick={openLightbox} />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={images[currentImageIndex].src}
          nextSrc={images[(currentImageIndex + 1) % images.length].src}
          prevSrc={
            images[(currentImageIndex + images.length - 1) % images.length].src
          }
          onCloseRequest={() => setViewerIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImage(
              (currentImageIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImageIndex + 1) % images.length)
          }
          animationDisabled={true}
          // TODO set image caption
        />
      )}
    </div>
  )
}

export default ImageGallery

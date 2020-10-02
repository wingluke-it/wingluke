import React from "react"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"

function Exhibit(props) {
  const { title, banner } = props
  return (
    <div>
      {banner && banner.asset && (
        <div>
          <img
            src={imageUrlFor(buildImageObj(banner))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit("crop")
              .auto("format")
              .url()}
            alt={banner.alt && banner.alt.en}
          />
        </div>
      )}
      <h1>{title && title.en}</h1>
    </div>
  )
}

export default Exhibit

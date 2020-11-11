import { graphql } from "gatsby"

export const SanityImage = graphql`
  fragment SanityImage on SanityFigure {
    _key
    alt_en
    caption_en
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
      metadata {
        lqip
        dimensions {
          aspectRatio
          width
          height
        }
      }
      fluid(maxWidth: 700) {
        ...GatsbySanityImageFluid
      }
    }
  }
`

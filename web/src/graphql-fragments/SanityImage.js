import { graphql } from "gatsby"

export const SanityImage = graphql`
  fragment SanityImage on SanityFigure {
    alt {
      en
    }
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
    }
  }
`

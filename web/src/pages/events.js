import React from "react"
import { graphql } from "gatsby"

const EventsPage = ({ data }) => {
  return <></>
}

export default EventsPage

export const query = graphql`
  {
    allSanityEvent {
      edges {
        node {
          title {
            en
          }
          subtitle {
            en
          }
          slug {
            current
          }
          _rawDescription
          banner {
            ...SanityImage
          }
        }
      }
    }
  }
`

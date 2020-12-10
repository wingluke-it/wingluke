import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"
// import { mapEdgesToNodes } from "../lib/helpers"

const SponsorPage = ({ data }) => {
  // const nodes = mapEdgesToNodes(data.allSanitySponsor)
  return (
    <>
      <SEO
        title="Sponsors"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Sponsors"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default SponsorPage

export const query = graphql`
  {
    allSanitySponsor {
      edges {
        node {
          tier
          name {
            en
          }
          # more fields to query
        }
      }
    }
  }
`

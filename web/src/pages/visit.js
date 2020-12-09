import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const VisitPage = ({ data }) => {
  // const nodes = mapEdgesToNodes(props.data.allSanityExhibit)
  return (
    <>
      <SEO
        title="Visit"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Visit"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default VisitPage

export const query = graphql`
  {
    sanityVisitorGuide {
      ticketPurchaseLink

      # more fields to query
    }
  }
`

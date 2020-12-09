import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const GivePage = ({ data }) => {
  // const nodes = mapEdgesToNodes(props.data.allSanityExhibit)
  return (
    <>
      <SEO
        title="Give"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Give"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default GivePage

export const query = graphql`
  {
    sanityDonorProgram {
      auctionEmail
      waysToGive {
        title {
          en
        }
      }
      donationsPhone
      donationsEmail
      donationLink
      devPhone
      devEmail
      auctionPhone
      # more fields to query
    }
  }
`

import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const JoinPage = ({ data }) => {
  // const nodes = mapEdgesToNodes(props.data.allSanityExhibit)
  return (
    <>
      <SEO
        title="Join"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Join"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default JoinPage

export const query = graphql`
  {
    sanityMembershipProgram {
      joinLink
      membershipLevels {
        name {
          en
        }
      }
      # more fields to query
    }
  }
`

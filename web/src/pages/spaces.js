import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const SpacesPage = ({ data }) => {
  return (
    <>
      <SEO
        title="Event Space Usage"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Event Space Usage"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default SpacesPage

export const query = graphql`
  {
    sanityEventSpaceUsage {
      contactEmail
    }
  }
`

import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const VolunteerPage = ({ data }) => {
  return (
    <>
      <SEO
        title="Volunteer"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"Volunteer"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default VolunteerPage

export const query = graphql`
  {
    sanityVolunteerProgram {
      applicationLink
    }
  }
`

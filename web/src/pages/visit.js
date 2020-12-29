import ButtonStyledA from "../components/base_elements/buttonStyledA"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"

const VisitPage = ({
  data: {
    sanityVisitorGuide: { _rawAdditionalInfo },
  },
}) => {
  return (
    <>
      <SEO
        title="Visit"
        description="Plan your visit to the Wing Luke Museum"
        // image={banner}
      />
      <TitleSection title={"Plan Your Visit"} />
    </>
  )
}

export default VisitPage

export const query = graphql`
  {
    sanityVisitorGuide {
      _rawAdditionalInfo
    }
  }
`

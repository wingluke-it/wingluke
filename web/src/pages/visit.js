import ButtonStyledA from "../components/base_elements/buttonStyledA"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import VisitNav from "../components/visitNav"
import { graphql } from "gatsby"

const VisitPage = ({
  data: {
    sanityVisitorGuide: { title, subtitle, _rawAdditionalInfo },
  },
}) => {
  return (
    <>
      <SEO
        title={title?.en ?? "Plan Your Visit"}
        description={subtitle?.en ?? "Plan your visit to the Wing Luke Museum"}
        // image={banner}
      />
      <TitleSection title={title?.en ?? "Plan Your Visit"} />
      <VisitNav />
    </>
  )
}

export default VisitPage

export const query = graphql`
  {
    sanityVisitorGuide {
      title {
        en
      }
      subtitle {
        en
      }
      _rawAdditionalInfo
    }
  }
`

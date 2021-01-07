import React from "react"
import SEO from "../../components/seo"
import TitleSection from "../../components/titleSection"
import VisitLayout from "../../components/visitLayout"
import { graphql } from "gatsby"

const VisitPage = ({
  data: {
    sanityVisitorGuide: { title, subtitle, description, _rawAdditionalInfo },
  },
}) => {
  return (
    <>
      <SEO
        title={title?.en ?? "Plan Your Visit"}
        description={
          description?.en ?? "Plan your visit to the Wing Luke Museum"
        }
        // image={banner}
      />
      {/* banner here */}
      <VisitLayout>
        <TitleSection
          title={title?.en ?? "Plan Your Visit"}
          subtitle={subtitle?.en}
        />
      </VisitLayout>
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
      description {
        en
      }
      _rawAdditionalInfo
    }
  }
`

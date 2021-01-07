import React from "react"
import SEO from "../../components/seo"
import TitleSection from "../../components/titleSection"
import VisitLayout from "../../components/visitLayout"
import { graphql } from "gatsby"

const GettingHerePage = ({
  data: {
    sanityHours: { title, subtitle, description, _rawAdditionalInfo },
  },
}) => {
  const gettingHereTitle = title?.en ?? "Getting Here"
  const gettingHereSubtitle =
    subtitle?.en ?? "Location, Directions, and Parking"
  const gettingHereDescription =
    description?.en ??
    "Location, Directions, and Parking for the Wing Luke Museum."
  return (
    <>
      <SEO
        title={gettingHereTitle}
        description={gettingHereDescription}
        // image={banner}
      />
      {/* banner here */}
      <VisitLayout>
        <TitleSection title={gettingHereTitle} subtitle={gettingHereSubtitle} />
      </VisitLayout>
    </>
  )
}

export default GettingHerePage

export const query = graphql`
  {
    sanityHours {
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

import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

const AboutPage = ({ data }) => {
  const nodes = mapEdgesToNodes(data.allSanityStaffMember)
  return (
    <>
      <SEO
        title="About"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // image={banner}
      />
      <TitleSection title={"About"} />
      <h2>Under Construction!</h2>
    </>
  )
}

export default AboutPage

export const query = graphql`
  {
    sanityMuseumMeta {
      mission {
        en
      }
    }
    allSanityStaffMember {
      edges {
        node {
          name {
            en
          }
          # more fields to query
        }
      }
    }
  }
`

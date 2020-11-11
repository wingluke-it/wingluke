import React from "react"
import { Link } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ExhibitsPage = props => {
  const exhibitNodes = mapEdgesToNodes(props.data.allSanityExhibit)
  return (
    <Layout>
      <SEO
        title="Exhibits"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        // image={banner}
      />
      <h1>Exhibits</h1>
      {exhibitNodes.map(exhibit => (
        <div>
          <Link to={`/exhibits/${exhibit.slug.current}`}>
            {exhibit.title && exhibit.title.en}
          </Link>
        </div>
      ))}
      <h2>Now on View</h2>
      <h2>Always on View</h2>
      <h2>Upcoming</h2>
      <h2>Past</h2>
      <h2>Traveling (Available For Rent)</h2>
    </Layout>
  )
}

export default ExhibitsPage

export const query = graphql`
  {
    allSanityExhibit {
      edges {
        node {
          title {
            en
          }
          slug {
            current
          }
          banner {
            ...SanityImage
          }
        }
      }
    }
  }
`

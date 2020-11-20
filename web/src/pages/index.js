import React from "react"
import { Link } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const exhibitNodes = mapEdgesToNodes(props.data.allSanityExhibit)
  return (
    <Layout>
      <SEO
        title="Home"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        // image={banner}
      />
      <h1>WLM Home</h1>
      {/* TODO: make this a component, shared with the exhibits page */}
      {exhibitNodes.map(exhibit => (
        <div>
          <Link to={`/exhibits/${exhibit.slug.current}`}>
            {exhibit.title && exhibit.title.en}
          </Link>
        </div>
      ))}
      <Link to="/exhibits/">Check out all exhibits</Link>
    </Layout>
  )
}

export default IndexPage

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

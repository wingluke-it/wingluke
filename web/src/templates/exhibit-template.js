import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Exhibit from "../components/exhibit"
import GraphQLErrorList from "../components/graphql-error-list"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ExhibitTemplate = props => {
  const { data, errors } = props
  const exhibit = data && data.exhibit
  return (
    <Layout textWhite={true}>
      {errors && <SEO title="GraphQL Error" />}
      {exhibit && (
        <SEO
          title={exhibit.title.en || "Untitled"}
          // description={toPlainText(post._rawExcerpt)}
          // TODO what if banner.asset is null?
          image={exhibit.banner}
        />
      )}

      {errors && <GraphQLErrorList errors={errors} />}

      {exhibit && <Exhibit {...exhibit} />}
      <Img fluid={exhibit.banner.asset.fluid} />
    </Layout>
  )
}

export default ExhibitTemplate

export const query = graphql`
  query ExhibitTemplateQuery($id: String!) {
    exhibit: sanityExhibit(id: { eq: $id }) {
      id
      banner {
        asset {
          fluid(maxWidth: 700) {
            ...GatsbySanityImageFluid
          }
        }
        ...SanityImage
        alt {
          en
        }
      }
      title {
        en
      }
      slug {
        current
      }
    }
  }
`

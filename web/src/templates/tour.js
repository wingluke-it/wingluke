import Banner from "../components/banner"
import DocsLayout from "../components/layouts/docsLayout"
import Layout from "../components/layout"
import PortableText from "../components/portableText"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
import { graphql } from "gatsby"
import { toPlainText } from "../lib/helpers"

const Tour = ({ data }) => {
  const { title, subtitle, _rawOverview, banner } = data.tour
  const sectionTitlesAndContent = {}
  if (_rawOverview && _rawOverview.en) {
    sectionTitlesAndContent["Overview"] = (
      <PortableText blocks={_rawOverview.en} />
    )
  }

  return (
    <Layout>
      <SEO
        title={(title && title.en) || "Untitled"}
        description={
          _rawOverview && _rawOverview.en && toPlainText(_rawOverview.en)
        }
        image={banner}
      />
      <article>
        <TitleSection
          title={title && title.en}
          subtitle={subtitle && subtitle.en}
        />
        <Banner figure={banner} />
        <DocsLayout
          main={<TocLayout sectionTitlesAndContent={sectionTitlesAndContent} />}
        />
      </article>
    </Layout>
  )
}

export default Tour

export const query = graphql`
  query TourTemplateQuery($id: String!) {
    tour: sanityTour(id: { eq: $id }) {
      title {
        en
      }
      subtitle {
        en
      }
      banner {
        ...SanityImage
      }
      _rawOverview
    }
  }
`

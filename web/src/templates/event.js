import { Link, graphql } from "gatsby"

import Banner from "../components/banner"
import DocsLayout from "../components/layouts/docsLayout"
import Layout from "../components/layout"
import NavList from "../components/navList"
import PortableText from "../components/portableText"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
// import styles from "./event.module.scss"
import navListStyles from "../components/navList.module.scss"
import { toPlainText } from "../lib/helpers"
import { useEvents } from "../hooks/useEvents"

const Event = props => {
  const { title, subtitle, banner, _rawDescription, _rawPricingDetails } =
    props.data && props.data.event
  const eventEdges = useEvents()
  const sectionTitlesAndContent = {}
  if (_rawDescription && _rawDescription.en) {
    sectionTitlesAndContent["Description"] = (
      <PortableText blocks={_rawDescription.en} />
    )
  }
  if (_rawPricingDetails && _rawPricingDetails.en) {
    sectionTitlesAndContent["Pricing Details"] = (
      <PortableText blocks={_rawPricingDetails.en} />
    )
  }

  return (
    <Layout>
      <SEO
        title={(title && title.en) || "Untitled"}
        description={
          _rawDescription &&
          _rawDescription.en &&
          toPlainText(_rawDescription.en)
        }
        image={banner}
      />
      <article>
        <TitleSection
          title={title && title.en}
          subtitle={subtitle && subtitle.en}
          beforeText={"EVENT"}
        />
        <Banner figure={banner} />
        <DocsLayout
          main={<TocLayout sectionTitlesAndContent={sectionTitlesAndContent} />}
          sidebar={
            <aside>
              <NavList
                listItems={[
                  <h2 key="all-events" className={"h4"}>
                    <Link to={"/events/"}>All Events</Link>
                  </h2>,
                  eventEdges.map(({ node }, index) => (
                    // TODO filter out past events
                    // TODO categorize by current and upcoming
                    // TODO alphabetize? include opening/closing dates?
                    <li key={`other-event-${index}`}>
                      <Link
                        activeClassName={navListStyles.activeLink}
                        partiallyActive={true}
                        to={`/events/${node.slug && node.slug.current}`}
                      >
                        {node.title && node.title.en}
                      </Link>
                    </li>
                  )),
                ]}
              />
            </aside>
          }
        />
      </article>
    </Layout>
  )
}

export default Event

export const query = graphql`
  query EventTemplateQuery($id: String!) {
    event: sanityEvent(id: { eq: $id }) {
      title {
        en
      }
      subtitle {
        en
      }
      banner {
        ...SanityImage
      }
      _rawDescription
      _rawPricingDetails
    }
  }
`

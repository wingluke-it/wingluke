import React from "react"
import { graphql, Link } from "gatsby"
import { toPlainText } from "../lib/helpers"
import classNames from "classnames"
import { useEvents } from "../hooks/useEvents"

import styles from "./event.module.scss"
import navListStyles from "../components/navList.module.scss"

import Layout from "../components/layout"
import TocLayout from "../components/layouts/tocLayout"
import NavList from "../components/navList"
import PortableText from "../components/portableText"
import SEO from "../components/seo"
import DocsLayout from "../components/layouts/docsLayout"
import Banner from "../components/banner"
import TitleSection from "../components/titleSection"

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
      <TitleSection
        title={title && title.en}
        subtitle={subtitle && subtitle.en}
      />
      <Banner figure={banner} />
      <DocsLayout
        sidebar={
          <NavList
            listItems={[
              <h2
                key="all-events"
                className={classNames("h4", navListStyles.header)}
              >
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
        }
        main={
          <article>
            <TocLayout sectionTitlesAndContent={sectionTitlesAndContent} />
          </article>
        }
      />
      {/* <article>
        <h1>{title && title.en}</h1>
      </article> */}
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

import { Link, graphql } from "gatsby"
import { compareAsc, format, parseISO } from "date-fns"
import { formatOccurrence, toListString, toPlainText } from "../lib/helpers"

import Banner from "../components/banner"
import DocsLayout from "../components/layouts/docsLayout"
import NavList from "../components/navList"
import PortableText from "../components/portableText"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
// import styles from "./event.module.scss"
import navListStyles from "../components/navList.module.scss"
import { useEvents } from "../hooks/useEvents"

const Event = props => {
  const {
    title,
    subtitle,
    scheduleType,
    finiteOccurrences,
    repeatingOccurrences,
    banner,
    _rawDescription,
    _rawPricingDetails,
  } = props.data && props.data.event
  const { occurrences } = finiteOccurrences ?? {}
  const {
    daysOfWeekRelMonthly,
    daysOfWeekWeekly,
    endDateTime,
    endRepeatDate,
    indexRelMonthly,
    intervalAbsMonthly,
    intervalDaily,
    intervalRelMonthly,
    intervalWeekly,
    recurrenceType,
    startDateTime,
  } = repeatingOccurrences ?? {}
  const eventEdges = useEvents()

  let dateInfo = []
  if (scheduleType === "finite" && occurrences && occurrences.length > 0) {
    // datetime format: "2020-12-05T23:15:00.000Z"
    dateInfo = occurrences
      .filter(occ => occ.startDateTime && occ.endDateTime)
      .sort((occ1, occ2) =>
        compareAsc(parseISO(occ1.startDateTime), parseISO(occ2.startDateTime))
      )
      .map((occ, index) => {
        const occIndexString =
          occurrences.length > 1 ? `Occurrence ${index + 1}: ` : ""
        const occString = formatOccurrence(occ.startDateTime, occ.endDateTime)
        return `${occIndexString}${occString}`
      })
  } else if (
    scheduleType === "repeating" &&
    recurrenceType &&
    startDateTime &&
    endDateTime
  ) {
    dateInfo.push(
      `First happens ${formatOccurrence(startDateTime, endDateTime)}.`
    )
    switch (recurrenceType) {
      case "daily":
        dateInfo.push(
          `Repeats every ${
            intervalDaily > 1 ? `${intervalDaily} days` : "day"
          }.`
        )
        break
      case "weekly":
        dateInfo.push(
          `Repeats on ${toListString(daysOfWeekWeekly)} every ${
            intervalWeekly > 1 ? `${intervalWeekly} weeks` : "week"
          }.`
        )
        break
      case "absMonthly":
        dateInfo.push(
          `Repeats on the ${format(parseISO(startDateTime), "do")} every ${
            intervalAbsMonthly > 1 ? `${intervalAbsMonthly} months` : "month"
          }.`
        )
        break
      case "relMonthly":
        dateInfo.push(
          `Repeats on the ${toListString(indexRelMonthly)} ${toListString(
            daysOfWeekRelMonthly
          )} every ${
            intervalRelMonthly > 1 ? `${intervalRelMonthly} months` : "month"
          }.`
        )
        break
      default:
        break
    }
    dateInfo.push(
      `Stops repeating after ${format(parseISO(endRepeatDate), "PPP")}.`
    )
  }

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
    <>
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
          after={
            <>
              {dateInfo.length > 0 &&
                dateInfo.map((occurrence, index) => (
                  <p
                    key={`occ-${index}`} /* className={styles.halfTopMargin} */
                  >
                    {occurrence}
                  </p>
                ))}
            </>
          }
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
    </>
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
      scheduleType
      finiteOccurrences {
        occurrences {
          endDateTime
          startDateTime
        }
      }
      repeatingOccurrences {
        daysOfWeekRelMonthly
        daysOfWeekWeekly
        endDateTime
        endRepeatDate
        indexRelMonthly
        intervalAbsMonthly
        intervalDaily
        intervalRelMonthly
        intervalWeekly
        recurrenceType
        startDateTime
      }
      banner {
        ...SanityImage
      }
      _rawDescription
      _rawPricingDetails
    }
  }
`

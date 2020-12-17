import React from "react"
import SEO from "../components/seo"
import TabbedTitles from "../components/tabbedTitles"
import WingCalendar from "../components/wingCalendar"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

const EventsPage = ({ data }) => {
  const finiteNodes = mapEdgesToNodes(data.finiteEvents)
  const repeatingNodes = mapEdgesToNodes(data.repeatingEvents)
  return (
    <>
      <SEO
        title={"Events"}
        description={"Events Calendar of the Wing Luke Museum"}
        // image={banner}
      />
      <TabbedTitles
        titles={[
          {
            title: "Exhibits",
            href: "/exhibits",
            activeTitle: false,
          },
          {
            title: "Events",
            href: "/events",
            activeTitle: true,
          },
          {
            title: "Tours",
            href: "/tours",
            activeTitle: false,
          },
        ]}
      />
      <WingCalendar
        contentType={"events"}
        finiteNodes={finiteNodes}
        repeatingNodes={repeatingNodes}
      />
    </>
  )
}

export default EventsPage

export const query = graphql`
  query($currentDate: Date!) {
    finiteEvents: allSanityEvent(filter: { scheduleType: { eq: "finite" } }) {
      edges {
        node {
          title {
            en
          }
          subtitle {
            en
          }
          slug {
            current
          }
          banner {
            ...SanityImage
          }
          finiteOccurrences {
            occurrences {
              startDateTime
              endDateTime
            }
          }
        }
      }
    }
    repeatingEvents: allSanityEvent(
      filter: {
        repeatingOccurrences: { endRepeatDate: { gte: $currentDate } }
        scheduleType: { eq: "repeating" }
      }
    ) {
      edges {
        node {
          title {
            en
          }
          repeatingOccurrences {
            daysOfWeekRelMonthly
            daysOfWeekWeekly
            endDateTime
            endRepeatDate
            indexRelMonthly
            intervalAbsMonthly
            intervalRelMonthly
            intervalWeekly
            intervalDaily
            recurrenceType
            startDateTime
          }
        }
      }
    }
  }
`

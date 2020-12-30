import React, { useState } from "react"

import SEO from "../components/seo"
import TabbedTitles from "../components/tabbedTitles"
import WingCalendar from "../components/wingCalendar"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

const EventsPage = ({ data, location }) => {
  const finiteNodes = mapEdgesToNodes(data.finiteEvents)
  const repeatingNodes = mapEdgesToNodes(data.repeatingEvents)
  const [datePicked, handleDateChange] = useState(
    location?.state?.datePassed ?? new Date()
  )
  return (
    <>
      <SEO
        title={"Events"}
        description={"Events Calendar of the Wing Luke Museum"}
        // image={banner}
      />
      <TabbedTitles
        dateToPass={datePicked}
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
        datePicked={datePicked}
        handleDateChange={handleDateChange}
      />
    </>
  )
}

export default EventsPage

export const query = graphql`
  query # ($currentDate: Date!)
  {
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
          scheduleDetails
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
        # repeatingOccurrences: { endRepeatDate: { gte: $currentDate } }
        scheduleType: { eq: "repeating" }
      }
    ) {
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
          scheduleDetails
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

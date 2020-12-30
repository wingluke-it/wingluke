import React, { useState } from "react"

import SEO from "../components/seo"
import TabbedTitles from "../components/tabbedTitles"
import WingCalendar from "../components/wingCalendar"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

const ToursPage = ({ data, pageContext: { currentDate }, location }) => {
  const finiteNodes = mapEdgesToNodes(data.finiteTours)
  const repeatingNodes = mapEdgesToNodes(data.repeatingTours)
  const [datePicked, handleDateChange] = useState(
    location?.state?.datePassed ?? new Date()
  )

  return (
    <>
      <SEO
        title={"Tours"}
        description={"Tours Calendar of the Wing Luke Museum"}
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
            activeTitle: false,
          },
          {
            title: "Tours",
            href: "/tours",
            activeTitle: true,
          },
        ]}
      />
      <WingCalendar
        contentType={"tours"}
        finiteNodes={finiteNodes}
        repeatingNodes={repeatingNodes}
        datePicked={datePicked}
        handleDateChange={handleDateChange}
      />
    </>
  )
}

export default ToursPage

export const query = graphql`
  query #($currentDate: Date!)
  {
    finiteTours: allSanityTour(filter: { scheduleType: { eq: "finite" } }) {
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
          scheduleDetails
        }
      }
    }
    repeatingTours: allSanityTour(
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
          scheduleDetails
        }
      }
    }
  }
`

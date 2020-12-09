import "react-calendar/dist/Calendar.css"
import "./datePicker.scss"

import React, { useState } from "react"
import { addYears, compareAsc, compareDesc, format, parseISO } from "date-fns"
import { isSameOrBefore, mapEdgesToNodes } from "../lib/helpers"

import Calendar from "react-calendar"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import classNames from "classnames"
import { graphql } from "gatsby"
import styles from "./events.module.scss"

const EventsPage = ({ data }) => {
  const [datePicked, handleDateChange] = useState(new Date())

  const eventNodes = mapEdgesToNodes(data.allSanityEvent)
  const upcomingEvents = {}
  const pastEvents = {}
  eventNodes.forEach(eventNode => {
    const {
      title,
      scheduleType,
      repeatingOccurrences,
      finiteOccurrences,
    } = eventNode
    const { occurrences } = finiteOccurrences ?? {}
    if (scheduleType === "finite" && occurrences && occurrences.length > 0) {
      occurrences
        .filter(occ => occ.startDateTime && occ.endDateTime)
        .forEach(occ => {
          const eventInfo = [title, occ]
          if (isSameOrBefore(datePicked, parseISO(occ.endDateTime))) {
            upcomingEvents[occ.startDateTime] = eventInfo
          } else {
            pastEvents[occ.startDateTime] = eventInfo
          }
        })
    }
  })
  const upcomingEventDates = Object.keys(upcomingEvents).sort((date1, date2) =>
    compareAsc(parseISO(date1), parseISO(date2))
  )
  const pastEventDates = Object.keys(pastEvents).sort((date1, date2) =>
    compareDesc(parseISO(date1), parseISO(date2))
  )
  const upcomingEventCards = upcomingEventDates.map((date, index) => {
    const [title, occurrence] = upcomingEvents[date]
    return (
      <div key={`event-${index}`}>
        {title && title.en && <h2>{title.en}</h2>}
        {<p>Starts: {format(parseISO(occurrence.startDateTime), "PPPp")}</p>}
        {<p>Ends: {format(parseISO(occurrence.endDateTime), "PPPp")}</p>}
      </div>
    )
  })
  const pastEventCards = pastEventDates.map((date, index) => {
    const [title, occurrence] = pastEvents[date]
    return (
      <div key={`event-${index}`}>
        {title && title.en && <h2>{title.en}</h2>}
      </div>
    )
  })

  return (
    <>
      <SEO
        title="Events"
        description="Events put on by the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        // image={banner}
      />
      <TitleSection title={"Events"} />
      <div className={styles.grid}>
        <div className={styles.datePickerContainer}>
          <p className={classNames("h4", styles.h2)}>
            What day are you planning on visiting?
          </p>
          <Calendar
            calendarType={"US"}
            className={classNames({ [styles.datePicker]: true }, "datePicker")}
            value={datePicked}
            onChange={handleDateChange}
            maxDate={addYears(new Date(), 2)}
            minDate={new Date()}
            minDetail={"month"}
            next2Label={null}
            prev2Label={null}
          />
        </div>
        <div className={styles.eventsContainer}>
          <p className={classNames("h4", styles.h2)}>
            Showing upcoming events after {format(datePicked, "PPP")}
          </p>
          {upcomingEventCards}
          <p className={classNames("h4")}>Past Events</p>
          {pastEventCards}
        </div>
      </div>
    </>
  )
}

export default EventsPage

export const query = graphql`
  {
    allSanityEvent {
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
          _rawDescription
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
        }
      }
    }
  }
`

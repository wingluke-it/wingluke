import "react-calendar/dist/Calendar.css"
import "./datePicker.scss"

import { Link, graphql } from "gatsby"
import React, { useState } from "react"
import {
  addYears,
  compareAsc,
  compareDesc,
  format,
  parse,
  parseISO,
} from "date-fns"
import { isSameOrBefore, mapEdgesToNodes } from "../lib/helpers"

import Calendar from "react-calendar"
import Figure from "../components/figure"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import classNames from "classnames"
import styles from "./events.module.scss"

const EventsPage = ({ data }) => {
  const [datePicked, handleDateChange] = useState(new Date())

  const eventNodes = mapEdgesToNodes(data.allSanityEvent)
  const upcomingEvents = {}
  // const pastEvents = {}
  eventNodes.forEach(eventNode => {
    const { scheduleType, repeatingOccurrences, finiteOccurrences } = eventNode
    const { occurrences } = finiteOccurrences ?? {}
    if (scheduleType === "finite" && occurrences && occurrences.length > 0) {
      occurrences
        .filter(occ => occ.startDateTime && occ.endDateTime)
        .forEach(occ => {
          const eventInfo = [occ, eventNode]
          const startDateKey = format(parseISO(occ.startDateTime), "MM-dd-yyyy")
          if (isSameOrBefore(datePicked, parseISO(occ.endDateTime))) {
            if (upcomingEvents[startDateKey]) {
              upcomingEvents[startDateKey].push(eventInfo)
            } else {
              upcomingEvents[startDateKey] = [eventInfo]
            }
          } /* else {
            pastEvents[occ.startDateTime] = eventInfo
          } */
        })
    }
  })
  const upcomingEventDates = Object.keys(upcomingEvents).sort((date1, date2) =>
    compareAsc(
      parse(date1, "MM-dd-yyyy", new Date()),
      parse(date2, "MM-dd-yyyy", new Date())
    )
  )
  /* const pastEventDates = Object.keys(pastEvents).sort((date1, date2) =>
    compareDesc(parseISO(date1), parseISO(date2))
  ) */
  const upcomingEventCards = []
  upcomingEventDates.forEach(date => {
    upcomingEventCards.push(
      <div key={date} className={styles.eventDateSection}>
        <h2>{format(parse(date, "MM-dd-yyyy", new Date()), "EEEE, PP")}</h2>
        {upcomingEvents[date]
          .sort(([occ1], [occ2]) =>
            compareAsc(
              parseISO(occ1.startDateTime),
              parseISO(occ2.startDateTime)
            )
          )
          .map((upcomingEvent, index) => {
            const [
              occurrence,
              { title, slug, banner, subtitle },
            ] = upcomingEvent
            return (
              <div key={`event-${index}`}>
                <Link to={`/events/${(slug && slug.current) || ""}`}>
                  {title && title.en && <h3>{title.en}</h3>}
                  {subtitle && subtitle.en && (
                    <p className={styles.eventCardSubtitle}>{subtitle.en}</p>
                  )}
                  <Figure figure={banner} width={500} dimensions={9 / 16} />
                </Link>
                <p>
                  Starts: {format(parseISO(occurrence.startDateTime), "PPPp")}
                </p>
                <p>Ends: {format(parseISO(occurrence.endDateTime), "PPPp")}</p>
              </div>
            )
          })}
      </div>
    )
  })
  /* const pastEventCards = pastEventDates.map((date, index) => {
    const [title, occurrence, slug] = pastEvents[date]
    return (
      <div key={`event-${index}`}>
        {title && title.en && (
          <Link to={`/events/${slug || ""}`}>
            <h2>{title.en}</h2>
          </Link>
        )}
        {<p>Started: {format(parseISO(occurrence.startDateTime), "PPPp")}</p>}
        {<p>Ended: {format(parseISO(occurrence.endDateTime), "PPPp")}</p>}
      </div>
    )
  }) */

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
          <p className={classNames("h4")}>
            What day are you planning on visiting?
          </p>
          <Calendar
            calendarType={"US"}
            className={classNames({ [styles.datePicker]: false }, "datePicker")}
            value={datePicked}
            onChange={handleDateChange}
            maxDate={addYears(new Date(), 2)}
            minDate={new Date()}
            minDetail={"month"}
            next2Label={null}
            prev2Label={null}
          />
          <p className={classNames("h4")}>
            Showing upcoming events on or after
            <br />
            {format(datePicked, "PPP")}
          </p>
        </div>
        <div className={styles.eventsContainer}>
          {upcomingEventCards}
          {/* <p className={classNames("h4")}>Past Events</p> */}
          {/* {pastEventCards} */}
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

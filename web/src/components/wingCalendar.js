import "react-calendar/dist/Calendar.css"
import "./datePicker.scss"

import React, { useEffect, useRef, useState } from "react"
import {
  addYears,
  compareAsc,
  format,
  isSameDay,
  parse,
  parseISO,
} from "date-fns"
import { getUpcomingDates, isSameOrBefore } from "../lib/helpers"

import { BsArrowDown } from "@react-icons/all-files/bs/BsArrowDown"
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import Calendar from "react-calendar"
import OccurrenceCard from "./occurrenceCard"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./wingCalendar.module.scss"
import { useMediaQuery } from "react-responsive"

// TODO add a section for past events/tours - note that graphql query currently filters out past repeating event/tours
const WingCalendar = ({
  contentType,
  finiteNodes,
  repeatingNodes,
  datePicked,
  handleDateChange,
}) => {
  const didMount = useRef(false)
  const calendarTop = useRef(null)
  useEffect(() => {
    const toScrollTo =
      calendarTop.current.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top
    if (didMount.current) {
      if (window.scrollY > toScrollTo) {
        window.scrollTo(0, toScrollTo)
      }
    } else {
      didMount.current = true
    }
  }, [datePicked]) // TODO perhaps only perform this scrollTo when the window's scrollY position is below calendarTop's position
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 767px)",
  })

  const upcomingOccurrences = {}

  // Pour finite occurrences into upcomingOccurrences
  finiteNodes.forEach(finiteNode => {
    const { finiteOccurrences } = finiteNode
    const { occurrences = [] } = finiteOccurrences ?? {}
    occurrences
      .filter(occ => occ.startDateTime && occ.endDateTime) // each occurrence should have both start and end values
      .map(occ => ({
        startDateTime: parseISO(occ.startDateTime),
        endDateTime: parseISO(occ.endDateTime),
      }))
      .forEach(occ => {
        const occInfo = [occ, finiteNode]
        const startDateKey = format(occ.startDateTime, "MM-dd-yyyy")
        if (isSameOrBefore(datePicked, occ.endDateTime)) {
          if (upcomingOccurrences[startDateKey]) {
            upcomingOccurrences[startDateKey].push(occInfo)
          } else {
            upcomingOccurrences[startDateKey] = [occInfo]
          }
        }
      })
  })
  // Pour repeating occurrences into upcomingOccurrences
  repeatingNodes.forEach(repeatingNode => {
    const { repeatingOccurrences } = repeatingNode
    const occurrences = getUpcomingDates(
      datePicked,
      1,
      repeatingOccurrences
    ).map(([startDT, endDT]) => ({
      startDateTime: startDT,
      endDateTime: endDT,
    }))
    occurrences
      .filter(occ => occ.startDateTime && occ.endDateTime) // each occurrence should have both start and end values
      .forEach(occ => {
        const occInfo = [occ, repeatingNode]
        const startDateKey = format(occ.startDateTime, "MM-dd-yyyy")
        if (isSameOrBefore(datePicked, occ.endDateTime)) {
          if (upcomingOccurrences[startDateKey]) {
            upcomingOccurrences[startDateKey].push(occInfo)
          } else {
            upcomingOccurrences[startDateKey] = [occInfo]
          }
        }
      })
    /* .map(([startDT, endDT]) => ({
        startDateTime: startDT,
        endDateTime: endDT,
      }))
      .forEach(([start, end], index) =>
        dateInfo.push(
          <p key={`occ-${index}`}>
            Upcoming occurrence {index + 1} happens{" "}
            {formatOccurrence(start, end)}
          </p>
        )
      ) */
  })

  const datePickedString = format(datePicked, "MM-dd-yyyy")
  if (!upcomingOccurrences[datePickedString]) {
    upcomingOccurrences[datePickedString] = []
  }
  const upcomingOccurrenceDates = Object.keys(
    upcomingOccurrences
  ).sort((date1, date2) =>
    compareAsc(
      parse(date1, "MM-dd-yyyy", new Date()),
      parse(date2, "MM-dd-yyyy", new Date())
    )
  )
  const upcomingOccurrenceCards = []
  upcomingOccurrenceDates.forEach(date => {
    upcomingOccurrenceCards.push(
      <div key={date} className={styles.dateSection}>
        <h2 className={"h3"}>
          {format(parse(date, "MM-dd-yyyy", new Date()), "EEEE, PP")}
        </h2>
        <div className={styles.cardContainer}>
          {upcomingOccurrences[date].length === 0 ? (
            <>
              <p>No {contentType} on this day.</p>
              <p>
                <BsArrowDown /> Upcoming {contentType} below.
              </p>
            </>
          ) : (
            upcomingOccurrences[date]
              .sort(([occ1], [occ2]) =>
                compareAsc(occ1.startDateTime, occ2.startDateTime)
              )
              .map((upcomingOcc, index) => {
                const [
                  occurrence,
                  { title, slug, banner, subtitle, scheduleDetails },
                ] = upcomingOcc
                const startDT = occurrence.startDateTime
                const endDT = occurrence.endDateTime
                let dateString
                let timeString
                if (isSameDay(startDT, endDT)) {
                  dateString = format(startDT, "EEE, MMM d")
                  timeString = `${format(startDT, "p")} to ${format(
                    endDT,
                    "p"
                  )}`
                } else {
                  dateString = `Ends ${format(endDT, "EEE, MMM d")}`
                  timeString = `${format(startDT, "p")}`
                }
                return (
                  <OccurrenceCard
                    title={title && title.en ? title.en : `Untitled`}
                    subtitle={subtitle && subtitle.en}
                    dateString={dateString}
                    timeString={timeString}
                    banner={banner}
                    key={`occ-${index}`}
                    href={
                      slug && slug.current
                        ? `/${contentType}/${slug.current}`
                        : null
                    }
                  />
                )
              })
          )}
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={styles.grid} ref={calendarTop}>
        <div className={styles.datePickerContainer}>
          <p className={classNames("h4")}>
            What day are you planning on visiting?
          </p>
          <Calendar
            calendarType={"US"}
            className={classNames(
              {
                [styles.datePicker]: false,
              },
              "datePicker"
            )}
            value={datePicked}
            onChange={handleDateChange}
            maxDate={addYears(new Date(), 2)}
            minDate={new Date()}
            minDetail={"month"}
            next2Label={null}
            prev2Label={null}
          />
          <p className={classNames("h4")}>
            Showing upcoming {contentType} on or after
            <br />
            {format(datePicked, "PPP")}
            <br />
            {isTabletOrMobile ? (
              <BsArrowDown size={"2rem"} />
            ) : (
              <BsArrowRight size={"2rem"} />
            )}
          </p>
        </div>
        <div className={styles.occContainer}>
          {upcomingOccurrenceCards}
          {/* <p className={classNames("h4")}>Past Events</p> */}
          {/* {pastEventCards} */}
        </div>
      </div>
    </>
  )
}

WingCalendar.propTypes = {
  contentType: PropTypes.oneOf(["tours", "events"]),
}

export default WingCalendar

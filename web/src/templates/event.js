import { compareAsc, format, isSameDay, parseISO } from "date-fns"
import {
  formatOccurrence,
  getUpcomingDates,
  toListString,
  toPlainText,
} from "../lib/helpers"

import Banner from "../components/banner"
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar"
import ButtonStyledA from "../components/base_elements/buttonStyledA"
import DocsLayout from "../components/layouts/docsLayout"
import { GoLocation } from "@react-icons/all-files/go/GoLocation"
import { IoTicketOutline } from "@react-icons/all-files/io5/IoTicketOutline"
import MenuNav from "../components/menuNav"
import PortableText from "../components/portableText"
import React from "react"
import { RiComputerLine } from "@react-icons/all-files/ri/RiComputerLine"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
import { graphql } from "gatsby"
import styles from "./event.module.scss"
import { useEvents } from "../hooks/useEvents"

const Detail = ({ icon, text }) => (
  <div className={styles.detail}>
    <span className={styles.iconContainer}>{icon}</span>
    <span className={styles.detailText}>{text}</span>
  </div>
)

const Event = props => {
  const {
    title,
    subtitle,
    slug,
    eventTags,
    scheduleType,
    finiteOccurrences,
    repeatingOccurrences,
    scheduleDetails,
    isOnline,
    loc,
    streamLink,
    admittanceType,
    ticketingLink,
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
        const startDT = parseISO(occ.startDateTime)
        const endDT = parseISO(occ.endDateTime)
        return (
          <div key={`occ-${index}`} className={styles.keyDetailsWhenOccurrence}>
            {occurrences.length > 1 && (
              <p className={"h4"}>Occurrence {index + 1}</p>
            )}
            {isSameDay(startDT, endDT) ? (
              <>
                <p>{format(startDT, "E, PP")}</p>
                <p>
                  {format(startDT, "p")} to {format(endDT, "p")}
                </p>
              </>
            ) : (
              <>
                <p>Starts: {format(startDT, "E, PP")}</p>
                <p>Ends: {format(endDT, "E, PP")}</p>
              </>
            )}
          </div>
        )
      })
  } else if (
    scheduleType === "repeating" &&
    recurrenceType &&
    startDateTime &&
    endDateTime
  ) {
    dateInfo.push(
      <p key={"first-occ"}>
        First happens{" "}
        {formatOccurrence(parseISO(startDateTime), parseISO(endDateTime))}.
      </p>
    )
    switch (recurrenceType) {
      case "daily":
        dateInfo.push(
          <p key={"repeat-info"}>
            Repeats every {intervalDaily > 1 ? `${intervalDaily} days` : "day"}.
          </p>
        )
        break
      case "weekly":
        dateInfo.push(
          <p key={"repeat-info"}>
            Repeats on {toListString(daysOfWeekWeekly)} every{" "}
            {intervalWeekly > 1 ? `${intervalWeekly} weeks` : "week"}.
          </p>
        )
        break
      case "absMonthly":
        dateInfo.push(
          <p key={"repeat-info"}>
            Repeats on the {format(parseISO(startDateTime), "do")} every{" "}
            {intervalAbsMonthly > 1 ? `${intervalAbsMonthly} months` : "month"}.
          </p>
        )
        break
      case "relMonthly":
        dateInfo.push(
          <p key={"repeat-info"}>
            Repeats on the {toListString(indexRelMonthly)}{" "}
            {toListString(daysOfWeekRelMonthly)} every{" "}
            {intervalRelMonthly > 1 ? `${intervalRelMonthly} months` : "month"}.
          </p>
        )
        break
      default:
        break
    }
    if (endRepeatDate) {
      dateInfo.push(
        <p key={"end-repeat"}>
          Stops repeating after {format(parseISO(endRepeatDate), "PPP")}.
        </p>
      )
    }

    getUpcomingDates(new Date(), 5, repeatingOccurrences).forEach(
      ([start, end], index) =>
        dateInfo.push(
          <p key={`occ-${index}`}>
            Upcoming occurrence {index + 1} happens{" "}
            {formatOccurrence(start, end)}
          </p>
        )
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
            <div className={styles.keyDetailsContainer}>
              <Detail text={dateInfo} icon={<BsCalendar title={"Date"} />} />
              <Detail
                text={
                  <>
                    {isOnline ? (
                      <p>Online</p>
                    ) : (
                      loc &&
                      loc.address && (
                        <>
                          {/* TODO location icon */}
                          {loc.siteName && loc.siteName.en && (
                            <p>{loc.siteName.en}</p>
                          )}
                          {loc.address && <p>{loc.address}</p>}
                        </>
                      )
                    )}
                    {streamLink && (
                      <ButtonStyledA
                        href={streamLink}
                        newtab={true}
                        text={"Join Stream"}
                      />
                    )}
                  </>
                }
                icon={
                  isOnline ? (
                    <RiComputerLine />
                  ) : (
                    <GoLocation title={"Location"} />
                  )
                }
              />
              <Detail
                icon={<IoTicketOutline />}
                text={
                  <>
                    {/* TODO capacityInfo */}
                    {/* TODO "RSVP on Facebook" button/link */}
                    {admittanceType === "freeNoReg" && <p>Free</p>}
                    {admittanceType === "freeWithReg" && (
                      <>
                        <p>Free with Registration</p>
                        {ticketingLink && (
                          <ButtonStyledA
                            href={ticketingLink}
                            newtab={true}
                            text={"Register"}
                          />
                        )}
                      </>
                    )}
                    {admittanceType === "ticketPurchaseRequired" && (
                      <>
                        <p>Ticket Purchase Required</p>
                        {ticketingLink && (
                          <ButtonStyledA
                            href={ticketingLink}
                            newtab={true}
                            text={"Buy Tickets"}
                          />
                        )}
                      </>
                    )}
                  </>
                }
              />
            </div>
          }
        />
        <Banner figure={banner} />
        <DocsLayout
          main={
            <TocLayout
              hideTocNav={true}
              headersHiddenAtBreakpoint={false}
              sectionTitlesAndContent={sectionTitlesAndContent}
              basepath={`events/${slug?.current}`}
            />
          }
          sidebar={
            <aside>
              <MenuNav
                breakpoint={767}
                title={"Events"}
                navItems={[
                  ...eventEdges.map(({ node }) => ({
                    to: `/events/${node.slug && node.slug.current}`,
                    text: node?.title?.en ?? "Untitled Event",
                  })),
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
      slug {
        current
      }
      eventTags
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
      scheduleDetails
      banner {
        ...SanityImage
      }
      isOnline
      loc {
        address
        siteName {
          en
        }
        # mapLocation # (for google maps lat lon)
      }
      streamLink
      admittanceType
      ticketingLink
      _rawDescription
      _rawPricingDetails
    }
  }
`

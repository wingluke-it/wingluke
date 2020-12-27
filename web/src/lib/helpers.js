// TODO audit this for actually useful/used helper functions
import {
  add,
  differenceInMinutes,
  format,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  isFriday,
  isFuture,
  isMonday,
  isSameDay,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  lastDayOfMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  sub,
} from "date-fns"

/* Given:
 * @param afterDate: the Date after which to return
 * @param datesNeeded: how many dates after afterDate to return
 * @param repeatingEvent:
 * repeatingEvent {
 *   startDateTime
 *   endDateTime
 *   endRepeatDate
 *   recurrenceType
 *   intervalDaily
 *   intervalWeekly
 *   daysOfWeekWeekly
 *   intervalRelMonthly
 *   daysOfWeekRelMonthly
 *   indexRelMonthly
 *   intervalAbsMonthly
 * }
 * @returns an array of upcoming dates
 *  */
export function getUpcomingDates(afterDate, datesNeeded, repeatingEvent) {
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
  } = repeatingEvent ?? {}

  let getNextDate
  switch (recurrenceType) {
    case "daily":
      getNextDate = currDate => add(currDate, { days: intervalDaily })
      break
    case "weekly":
      getNextDate = currDate => add(currDate, { weeks: intervalWeekly })
      break
    case "absMonthly":
      getNextDate = currDate => add(currDate, { months: intervalAbsMonthly })
      break
    case "relMonthly":
      getNextDate = currDate => add(currDate, { months: intervalRelMonthly })
      break
    default:
      getNextDate = cDate => cDate
      break
  }

  const upcomingDates = []
  let currStart = parseISO(startDateTime),
    currEnd = parseISO(endDateTime)
  let diffInMin = differenceInMinutes(currEnd, currStart)
  while (
    upcomingDates.length < datesNeeded &&
    (!endRepeatDate || isSameOrBefore(currStart, parseISO(endRepeatDate)))
  ) {
    const days = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    }
    switch (recurrenceType) {
      case "daily":
      case "absMonthly":
        if (isSameOrAfter(currEnd, afterDate)) {
          upcomingDates.push([currStart, currEnd])
        }
        break
      case "weekly":
        const weekStart = add(startOfWeek(currStart), {
          hours: getHours(currStart),
          minutes: getMinutes(currStart),
        })
        daysOfWeekWeekly.forEach(day => {
          const startDateToAdd = add(weekStart, { days: days[day] })
          const endDateToAdd = add(startDateToAdd, { minutes: diffInMin })
          if (isSameOrAfter(endDateToAdd, afterDate)) {
            upcomingDates.push([startDateToAdd, endDateToAdd])
          }
        })
        break
      case "relMonthly":
        const currStartCopy = currStart // this is to avoid the 'no-loop-func' ESLintError
        indexRelMonthly.forEach(weekIndex => {
          daysOfWeekRelMonthly.forEach(dayOfWeek => {
            const startDateToAdd = add(
              getRelMonthlyDate(weekIndex, dayOfWeek, currStartCopy),
              {
                hours: getHours(currStartCopy),
                minutes: getMinutes(currStartCopy),
              }
            )
            const endDateToAdd = add(startDateToAdd, { minutes: diffInMin })
            if (
              isSameOrAfter(endDateToAdd, afterDate) &&
              (!endRepeatDate ||
                isSameOrBefore(startDateToAdd, parseISO(endRepeatDate))) // TODO BUG HERE, endRepeatDate might be null!
            ) {
              upcomingDates.push([startDateToAdd, endDateToAdd])
            }
          })
        })
        break
      default:
        break
    }
    currStart = getNextDate(currStart)
    currEnd = getNextDate(currEnd)
  }

  return upcomingDates
}

// monthDate provides a date that includes the month in question
export function getRelMonthlyDate(weekIndex, dayOfWeek, monthDate) {
  const isDayOfWeek = {
    Sunday: isSunday,
    Monday: isMonday,
    Tuesday: isTuesday,
    Wednesday: isWednesday,
    Thursday: isThursday,
    Friday: isFriday,
    Saturday: isSaturday,
  }[dayOfWeek]
  if (weekIndex === "last") {
    let currDay = lastDayOfMonth(monthDate)
    while (true) {
      if (isDayOfWeek(currDay)) {
        return currDay
      }

      currDay = sub(currDay, { days: 1 })
    }
  } else {
    const weeks = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
    }
    let dayOfWeekMatches = 0
    let currDay = startOfMonth(monthDate)
    while (dayOfWeekMatches < weeks[weekIndex]) {
      if (isDayOfWeek(currDay)) {
        dayOfWeekMatches++
      }

      currDay = add(currDay, { days: 1 })
    }

    return sub(currDay, { days: 1 })
  }
}

export function isSameOrBefore(date, dateToCompare) {
  return isSameDay(date, dateToCompare) || isBefore(date, dateToCompare)
}

export function isSameOrAfter(date, dateToCompare) {
  return isSameDay(date, dateToCompare) || isAfter(date, dateToCompare)
}

export function toListString(arr) {
  if (arr.length === 0) {
    return ""
  }

  if (arr.length === 1) {
    return arr[0]
  }

  const lastString = arr.slice(arr.length - 1)
  return `${arr.slice(0, arr.length - 1).join(", ")} and ${lastString}`
}

export function formatOccurrence(startDateTime, endDateTime) {
  const startDT = startDateTime
  const endDT = endDateTime
  if (isSameDay(startDT, endDT)) {
    return `${format(startDT, "PPPP")} from ${format(startDT, "p")} to ${format(
      endDT,
      "p"
    )}`
  } else {
    return `${format(startDT, "PPPPp")} to ${format(endDT, "PPPPp")}`
  }
}

export function getExhibitStatus(openingDate, closingDate, specialCategory) {
  const statuses = {
    noStatus: "",
    virtual: "Virtual",
    nowOnView: "Now on View",
    alwaysOnView: "Always on View",
    upcoming: "Upcoming",
    past: "Past",
    traveling: "Traveling (For Rent)",
  }
  let exhibitStatus
  let secondaryStatus
  const today = new Date()
  const oDate = openingDate && parseISO(openingDate)
  const cDate = closingDate && parseISO(closingDate)
  if (specialCategory && specialCategory !== "none") {
    switch (specialCategory) {
      case "virtual":
        exhibitStatus = statuses.virtual
        secondaryStatus = ""
        break
      case "traveling":
        exhibitStatus = statuses.traveling
        secondaryStatus = ""
        break
      case "past":
        exhibitStatus = statuses.past
        secondaryStatus = ""
        break
      case "upcoming":
        exhibitStatus = statuses.upcoming
        secondaryStatus = "Opening Date TBA"
        break
      case "nowOnView":
        exhibitStatus = statuses.nowOnView
        secondaryStatus = "Closing Date TBA"
        break
      case "alwaysOnView":
        exhibitStatus = statuses.alwaysOnView
        secondaryStatus = ""
        break
      default:
        break
    }
  } else if (!oDate) {
    exhibitStatus = statuses.noStatus
  } else if (isSameDay(today, oDate)) {
    exhibitStatus = cDate ? statuses.nowOnView : statuses.alwaysOnView
    secondaryStatus = "Opening today!"
  } else if (isBefore(today, oDate)) {
    exhibitStatus = statuses.upcoming
    secondaryStatus = `Will open ${format(oDate, "PP")}`
  } else if (isAfter(today, oDate)) {
    if (!cDate) {
      exhibitStatus = statuses.alwaysOnView
      secondaryStatus = `On view since ${format(oDate, "PP")}`
    } else if (isSameDay(today, cDate)) {
      exhibitStatus = statuses.nowOnView
      secondaryStatus = `Closes today (last day to view)`
    } else if (isBefore(today, cDate)) {
      exhibitStatus = statuses.nowOnView
      secondaryStatus = `Closes ${format(cDate, "PP")}`
    } else if (isAfter(today, cDate)) {
      exhibitStatus = statuses.past
      secondaryStatus = `Ran from ${format(oDate, "MMM yyyy")} to ${format(
        cDate,
        "MMM yyyy"
      )}`
    }
  }

  return [exhibitStatus, secondaryStatus]
}

export function getContentWidth(element) {
  var styles = getComputedStyle(element)

  return (
    element.scrollWidth -
    parseFloat(styles.paddingLeft) -
    parseFloat(styles.paddingRight)
  )
}

export function cn(...args) {
  return args.filter(Boolean).join(" ")
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt)
}

export function getBlogUrl(slug) {
  return `/blog/${slug.current || slug}/`
}

export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText(blocks) {
  if (!blocks) {
    return ""
  }
  return blocks
    .map(block => {
      if (block._type !== "block" || !block.children) {
        return ""
      }
      return block.children.map(child => child.text).join("")
    })
    .join("\n\n")
}

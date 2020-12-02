// TODO audit this for actually useful/used helper functions
import {
  format,
  isAfter,
  isBefore,
  isFuture,
  isSameDay,
  parseISO,
} from "date-fns"

export function toListString(arr) {
  if (arr.length === 0) {
    return ""
  }

  if (arr.length === 1) {
    return arr[0]
  }

  const lastString = arr.pop()
  return `${arr.join(", ")} and ${lastString}`
}

export function formatOccurrence(startDateTime, endDateTime) {
  const startDT = parseISO(startDateTime)
  const endDT = parseISO(endDateTime)
  if (isSameDay(startDT, endDT)) {
    return `${format(startDT, "PP")} from ${format(startDT, "p")} to ${format(
      endDT,
      "p"
    )}`
  } else {
    return `${format(startDT, "PPp")} to ${format(endDT, "PPp")}`
  }
}

export function getExhibitStatus(openingDate, closingDate, specialCategory) {
  const statuses = {
    noStatus: "",
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

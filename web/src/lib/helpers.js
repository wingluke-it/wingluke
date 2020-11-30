// TODO audit this for actually useful/used helper functions
import { isFuture, format, isAfter, isBefore, isSameDay, parse } from "date-fns"

export function getExhibitStatus(openingDate, closingDate, specialCategories) {
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
  const oDate = openingDate && parse(openingDate, "yyyy-MM-dd", new Date())
  const cDate = closingDate && parse(closingDate, "yyyy-MM-dd", new Date())
  if (specialCategories.includes("traveling")) {
    exhibitStatus = statuses.traveling
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
    } else if (isSameDay(today, cDate)) {
      exhibitStatus = statuses.nowOnView
      secondaryStatus = `Closes today (last day to view)`
    } else if (isBefore(today, cDate)) {
      exhibitStatus = statuses.nowOnView
      secondaryStatus = `Closes ${format(cDate, "PP")}`
    } else if (isAfter(today, cDate)) {
      exhibitStatus = statuses.past
      secondaryStatus = `Ran from ${format(oDate, "P")} to ${format(
        cDate,
        "P"
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

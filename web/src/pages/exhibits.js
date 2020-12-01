import { Link, graphql } from "gatsby"
import { compareAsc, compareDesc, parse } from "date-fns"
import { getExhibitStatus, mapEdgesToNodes } from "../lib/helpers"

import Figure from "../components/figure"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
import classNames from "classnames"
import styles from "./exhibits.module.scss"

const ExhibitsPage = props => {
  const exhibitNodes = mapEdgesToNodes(props.data.allSanityExhibit)
  const past = []
  const upcoming = []
  const nowOnView = []
  const alwaysOnView = []
  const traveling = []

  const secondaryStatuses = {}
  // pour exhibits into category arrays
  exhibitNodes.forEach(exhibit => {
    const openingDate = exhibit.openingDate
    const closingDate = exhibit.closingDate
    const specialCategory = exhibit.specialCategory
    const [status, secondaryStatus] = getExhibitStatus(
      openingDate,
      closingDate,
      specialCategory
    )
    secondaryStatuses[exhibit.id] = secondaryStatus
    switch (status) {
      case "Now on View":
        nowOnView.push(exhibit)
        break
      case "Always on View":
        alwaysOnView.push(exhibit)
        break
      case "Upcoming":
        upcoming.push(exhibit)
        break
      case "Past":
        past.push(exhibit)
        break
      case "Traveling (For Rent)":
        traveling.push(exhibit)
        break
      default:
        console.log(
          `[WARNING] Exhibit ${
            exhibit.title && exhibit.title.en
          } will not be displayed on /exhibits/ page. Please give it an opening date or mark it with a special exhibit category.`
        )
    }
  })

  // now sort all of our arrays
  const dateString = "1000-12-25" // arbitrary long past date
  past.sort((ex1, ex2) =>
    compareDesc(
      parse(ex1.openingDate || dateString, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate || dateString, "yyyy-MM-dd", new Date())
    )
  )
  upcoming.sort((ex1, ex2) =>
    compareAsc(
      parse(ex1.openingDate || dateString, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate || dateString, "yyyy-MM-dd", new Date())
    )
  )
  nowOnView.sort((ex1, ex2) =>
    compareAsc(
      parse(ex1.closingDate || dateString, "yyyy-MM-dd", new Date()),
      parse(ex2.closingDate || dateString, "yyyy-MM-dd", new Date())
    )
  )
  alwaysOnView.sort((ex1, ex2) =>
    compareDesc(
      parse(ex1.openingDate || dateString, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate || dateString, "yyyy-MM-dd", new Date())
    )
  )
  traveling.sort((ex1, ex2) => {
    if (!ex1.title || !ex1.title.en || !ex2.title || !ex2.title.en) {
      return 0
    }

    return ex1.title.en.localeCompare(ex2.title.en, "en", {
      ignorePunctuation: true,
    })
  })

  const sectionTitlesAndContent = {}

  if (nowOnView.length > 0) {
    sectionTitlesAndContent["Now on View"] = (
      <ul className={classNames(styles.grid, styles.nowOnView)}>
        {nowOnView.map((exhibit, index) => (
          <li key={`now-on-view-${index}`}>
            <Link to={`/exhibits/${exhibit.slug && exhibit.slug.current}`}>
              {exhibit.banner && (
                <Figure
                  figure={exhibit.banner}
                  // dimensions={1 / 1} defaults to 9 / 16 ?
                  width={300}
                  displayCaption={false}
                  // className={styles.banner}
                />
              )}
              {exhibit.title && exhibit.title.en && (
                <h3 className={"h4"}>{exhibit.title.en}</h3>
              )}
              {exhibit.subtitle && exhibit.subtitle.en && (
                <p className={styles.subtitle}>
                  <i>{exhibit.subtitle.en}</i>
                </p>
              )}
              <p className={styles.secondaryStatus}>
                {secondaryStatuses[exhibit.id]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  if (alwaysOnView.length > 0) {
    sectionTitlesAndContent["Always on View"] = (
      <ul className={classNames(styles.grid, styles.alwaysOnView)}>
        {alwaysOnView.map((exhibit, index) => (
          <li key={`always-on-view-${index}`}>
            <Link to={`/exhibits/${exhibit.slug && exhibit.slug.current}`}>
              {exhibit.banner && (
                <Figure
                  figure={exhibit.banner}
                  // dimensions={1 / 1} defaults to 9 / 16 ?
                  width={300}
                  displayCaption={false}
                  // className={styles.banner}
                />
              )}
              {exhibit.title && exhibit.title.en && (
                <h3 className={"h4"}>{exhibit.title.en}</h3>
              )}
              {exhibit.subtitle && exhibit.subtitle.en && (
                <p className={styles.subtitle}>
                  <i>{exhibit.subtitle.en}</i>
                </p>
              )}
              <p className={styles.secondaryStatus}>
                {secondaryStatuses[exhibit.id]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  if (upcoming.length > 0) {
    sectionTitlesAndContent["Upcoming"] = (
      <ul className={classNames(styles.grid, styles.upcoming)}>
        {upcoming.map((exhibit, index) => (
          <li key={`upcoming-${index}`}>
            <Link to={`/exhibits/${exhibit.slug && exhibit.slug.current}`}>
              {exhibit.banner && (
                <Figure
                  figure={exhibit.banner}
                  // dimensions={1 / 1} defaults to 9 / 16 ?
                  width={300}
                  displayCaption={false}
                  // className={styles.banner}
                />
              )}
              {exhibit.title && exhibit.title.en && (
                <h3 className={"h4"}>{exhibit.title.en}</h3>
              )}
              {exhibit.subtitle && exhibit.subtitle.en && (
                <p className={styles.subtitle}>
                  <i>{exhibit.subtitle.en}</i>
                </p>
              )}
              <p className={styles.secondaryStatus}>
                {secondaryStatuses[exhibit.id]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  if (past.length > 0) {
    sectionTitlesAndContent["Past"] = (
      <ul className={classNames(styles.grid, styles.past)}>
        {past.map((exhibit, index) => (
          <li key={`past-${index}`}>
            <Link to={`/exhibits/${exhibit.slug && exhibit.slug.current}`}>
              {/* {exhibit.banner && (
                <Figure
                  figure={exhibit.banner}
                  // dimensions={1 / 1} defaults to 9 / 16 ?
                  width={300}
                  displayCaption={false}
                />
              )} */}
              {exhibit.title && exhibit.title.en && (
                <h3 className={"h4"}>{exhibit.title.en}</h3>
              )}
              {exhibit.subtitle && exhibit.subtitle.en && (
                <p className={styles.subtitle}>
                  <i>{exhibit.subtitle.en}</i>
                </p>
              )}
              <p className={styles.secondaryStatus}>
                {secondaryStatuses[exhibit.id]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  if (traveling.length > 0) {
    sectionTitlesAndContent["Traveling (For Rent)"] = (
      <ul className={classNames(styles.grid, styles.traveling)}>
        {traveling.map((exhibit, index) => (
          <li key={`traveling-${index}`}>
            <Link to={`/exhibits/${exhibit.slug && exhibit.slug.current}`}>
              {exhibit.banner && (
                <Figure
                  figure={exhibit.banner}
                  // dimensions={1 / 1} defaults to 9 / 16 ?
                  width={300}
                  displayCaption={false}
                />
              )}
              {exhibit.title && exhibit.title.en && (
                <h3 className={"h4"}>{exhibit.title.en}</h3>
              )}
              {exhibit.subtitle && exhibit.subtitle.en && (
                <p className={styles.subtitle}>
                  <i>{exhibit.subtitle.en}</i>
                </p>
              )}
              {/* <p className={styles.secondaryStatus}>{secondaryStatus[exhibit.id]}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <SEO
        title="Exhibits"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        // image={banner}
      />
      <TitleSection title={"Exhibits"} />
      <hr />
      <TocLayout
        sectionTitlesAndContent={sectionTitlesAndContent}
        headersHiddenAtBreakpoint={false}
        tocTitle={""}
        breakpoint={"tablet"}
      />
    </>
  )
}

export default ExhibitsPage

export const query = graphql`
  {
    allSanityExhibit {
      edges {
        node {
          id
          title {
            en
          }
          subtitle {
            en
          }
          slug {
            current
          }
          _rawOverview
          banner {
            ...SanityImage
          }
          specialCategory
          openingDate
          closingDate
        }
      }
    }
  }
`

import React from "react"
import { Link } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import {
  isAfter,
  isBefore,
  parse,
  isSameDay,
  compareDesc,
  format,
  compareAsc,
} from "date-fns"
import classNames from "classnames"
import { graphql } from "gatsby"

import styles from "./exhibits.module.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"

const ExhibitsPage = props => {
  const exhibitNodes = mapEdgesToNodes(props.data.allSanityExhibit)
  const past = []
  const upcoming = []
  const nowOnView = []
  const alwaysOnView = []
  const traveling = []
  const today = new Date()

  // pour exhibits into category arrays
  exhibitNodes.forEach((exhibit, index) => {
    const openingDate = exhibit.openingDate
    const closingDate = exhibit.closingDate
    const oDate = openingDate && parse(openingDate, "yyyy-MM-dd", new Date())
    const cDate = closingDate && parse(closingDate, "yyyy-MM-dd", new Date())
    if (exhibit.specialCategories.includes("traveling")) {
      traveling.push(exhibit)
    } else if (!oDate) {
      // TODO what to do here? it is a required value in Sanity, so hopefully we won't get to this point
    } else if (isSameDay(oDate, today)) {
      if (!cDate) {
        alwaysOnView.push(exhibit)
      } else {
        nowOnView.push(exhibit)
      }
    } else if (isBefore(oDate, today)) {
      console.log(exhibit)
      if (!cDate) {
        alwaysOnView.push(exhibit)
      } else if (isBefore(today, cDate) || isSameDay(today, cDate)) {
        nowOnView.push(exhibit)
      } else if (isAfter(today, cDate)) {
        past.push(exhibit)
      }
    } else if (isAfter(oDate, today)) {
      upcoming.push(exhibit)
    }
  })

  // now sort all of our arrays
  past.sort((ex1, ex2) =>
    compareDesc(
      parse(ex1.openingDate, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate, "yyyy-MM-dd", new Date())
    )
  )
  upcoming.sort((ex1, ex2) =>
    compareAsc(
      parse(ex1.openingDate, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate, "yyyy-MM-dd", new Date())
    )
  )
  nowOnView.sort((ex1, ex2) =>
    compareAsc(
      parse(ex1.closingDate, "yyyy-MM-dd", new Date()),
      parse(ex2.closingDate, "yyyy-MM-dd", new Date())
    )
  )
  alwaysOnView.sort((ex1, ex2) =>
    compareDesc(
      parse(ex1.openingDate, "yyyy-MM-dd", new Date()),
      parse(ex2.openingDate, "yyyy-MM-dd", new Date())
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
      <div className={classNames(styles.grid, styles.nowOnView)}>
        {nowOnView.map((exhibit, index) => (
          <div key={`now-on-view-${index}`}>
            {exhibit.title && exhibit.title.en && <h3>{exhibit.title.en}</h3>}
            <p className={styles.dateInfo}>{`Closes ${format(
              parse(exhibit.closingDate, "yyyy-MM-dd", new Date()),
              "PPP"
            )}`}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Layout>
      <SEO
        title="Exhibits"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        // image={banner}
      />
      <TitleSection title={"Exhibits"} />
      <TocLayout sectionTitlesAndContent={sectionTitlesAndContent} />
      {/* {exhibitNodes.map(exhibit => (
        <div>
          <Link to={`/exhibits/${exhibit.slug.current}`}>
            {exhibit.title && exhibit.title.en}
          </Link>
        </div>
      ))} */}
      {/* <h2>Now on View</h2> */}
      <h2>Always on View</h2>
      <h2>Upcoming</h2>
      <h2>Past</h2>
      <h2>Traveling (Available For Rent)</h2>
    </Layout>
  )
}

export default ExhibitsPage

export const query = graphql`
  {
    allSanityExhibit {
      edges {
        node {
          title {
            en
          }
          slug {
            current
          }
          banner {
            ...SanityImage
          }
          specialCategories
          openingDate
          closingDate
        }
      }
    }
  }
`

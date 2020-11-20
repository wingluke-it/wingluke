import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import classNames from "classnames"
import styles from "./tocLayout.module.scss"

/* sectionTitlesAndContent: { sectionTitle: <jsx element> } */
const TocLayout = ({ sectionTitlesAndContent }) => {
  const titles = Object.keys(sectionTitlesAndContent)
  const ids = titles.map(title => title.replace(/\W/g, "-").toLowerCase())
  const tocLinks = ids.map((id, index) => (
    <Link key={id} to={`#${id}`}>
      {titles[index]}
    </Link>
  ))
  const sectionRefs = useRef([])
  const sections = titles.map((title, index) => (
    <section
      key={title}
      ref={ref => sectionRefs.current.push(ref)}
      className={styles.tocSection}
      id={ids[index]}
    >
      <h2 className={classNames("h3", { [styles.hiddenOnDesktop]: true })}>
        {title}
      </h2>
      {sectionTitlesAndContent[title]}
    </section>
  ))

  const [activeItems, setActiveItems] = useState({})

  useEffect(() => {
    const ai = {}
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.id //getAttribute("id")
          ai[id] = entry.intersectionRatio
        })
        setActiveItems({ ...ai })
      },
      {
        // rootMargin: "0px 0px 0px 0px", // = header height = 2 * baseline = 2 * 1.5 * ~16px
        // not sure whether this list is exhaustive or handles all edge cases (for really tall sections, e.g.)
        threshold: [0, 0.05, 0.1, 0.45, 0.5, 0.55, 0.9, 0.95, 1],
      }
    )

    // document.querySelectorAll("section[id]")
    sectionRefs.current.forEach(section => {
      observer.observe(section)
    })

    return function cleanup() {
      observer.disconnect()
    }
  }, [])

  let activeItem = ids[0]
  for (const id in activeItems) {
    if (activeItems[id] > activeItems[activeItem]) {
      activeItem = id
    }
  }

  return (
    <div className={styles.grid}>
      <nav className={styles.toc}>
        <h2 className={classNames("h4", styles.tocHeader)}>On This Page</h2>
        <ul>
          {tocLinks.map(tocLink => (
            <li
              key={tocLink.key}
              className={classNames({
                [styles.activeLink]: tocLink.key === activeItem,
              })}
            >
              {tocLink}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.main}>{sections}</div>
    </div>
  )
}

export default TocLayout

import React, { useState, useEffect } from "react"
import styles from "./containerWithToc.module.scss"

import classNames from "classnames"

import TocLink from "../tocLink"
import ContainerWithSidebar from "./containerWithSidebar"
import MainColumn from "./mainColumn"

/* sections: an array of TocSections */
const ContainerWithToc = ({
  sidebarContentRight,
  sidebarContentLeft,
  sections,
  children,
}) => {
  /*
   * Store the active tocItems in state to force update
   * when changed
   */
  const [activeItems, setActiveItems] = useState({})

  useEffect(() => {
    const ai = {}
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id")
          ai[id] = entry.intersectionRatio
        })
        setActiveItems({ ...ai })
      },
      {
        rootMargin: "-24px 0px 0px 0px", // = header height = 2 * baseline = 2 * 1.5 * ~16px
        // not sure whether this list is exhaustive or handles all edge cases (for really tall sections, e.g.)
        threshold: [0, 0.05, 0.1, 0.45, 0.5, 0.55, 0.9, 0.95, 1],
      }
    )

    document.querySelectorAll("section[id]").forEach(section => {
      observer.observe(section)
    })
  }, [])

  /*
   * Create the list of MenuItems based on the menuItems object we have defined above
   */
  let activeItem = sections[0].props.id
  for (const id in activeItems) {
    if (activeItems[id] > activeItems[activeItem]) {
      activeItem = id
    }
  }

  const tocLinks = sections.map((section, index) => {
    return (
      <TocLink
        id={section.props.id}
        key={`menuitem_${index}`}
        active={section.props.id === activeItem}
      >
        {section.props.headingText}
      </TocLink>
    )
  })

  return (
    <ContainerWithSidebar
      sidebarContentLeft={
        // TOC
        <>
          <nav className={styles.tocNav}>
            {/* {Object.keys(activeItems).map(key => (
            <p key={key}>{key}</p>
          ))} */}
            <h2 className={classNames("h4", styles.sidebarHeader)}>
              On This Page
            </h2>
            <ul className={styles.toc}>{tocLinks}</ul>
          </nav>
          {sidebarContentLeft}
        </>
      }
      sidebarContentRight={sidebarContentRight}
    >
      <MainColumn>
        {sections}
        {children}
      </MainColumn>
    </ContainerWithSidebar>
  )
}

// TODO validate sections prop to be an array of TocSections
// https://reactjs.org/docs/typechecking-with-proptypes.html

export default ContainerWithToc

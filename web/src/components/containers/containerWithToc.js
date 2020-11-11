import React, { useState, useEffect } from "react"
// import styles from "./containerWithToc.module.scss"

import TocLink from "../tocLink"
import ContainerWithSidebar from "./containerWithSidebar"
import MainColumn from "./mainColumn"

const ai = {}

/* sections: an array of TocSections */
const ContainerWithToc = ({ sidebarContent, sections, children }) => {
  /*
   * Store the active tocItems in state to force update
   * when changed
   */
  const [activeItems, setActiveItems] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      console.log("activeItems")
      console.log(activeItems)
      // ai = Object.assign({}, activeItems)
      console.log("ai")
      console.log(ai)
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id")
        /* if (entry.intersectionRatio > 0) {
          if (!ais.includes(id)) {
            ais.push(id)
          } */
        console.log(`${id} intersectionRatio: ${entry.intersectionRatio}`)
        ai[id] = entry.intersectionRatio > 0 ? true : false
        /* document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.add("active") */
        /* } else {
          if (ais.includes(id)) {

          }
          ais[id] */
        /* document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.remove("active") */
        // }
      })
      console.log("observed, ai:")
      console.log(ai)
      setActiveItems({ ...ai })
      // updateActiveItems()
      // console.log(ais)
    })

    document.querySelectorAll("section[id]").forEach(section => {
      observer.observe(section)
    })
  }, [])

  /*
   * Create the list of MenuItems based on the menuItems object we have defined above
   */
  const tocLinks = sections.map((section, index) => {
    return (
      <TocLink
        id={section.props.id}
        key={`menuitem_${index}`}
        active={activeItems[section.props.id]}
      >
        {section.props.headingText}
      </TocLink>
    )
  })
  console.log("rerender!")
  console.log(activeItems)

  return (
    <ContainerWithSidebar
      sidebarContent={
        // TOC
        <>
          {/* {Object.keys(activeItems).map(key => (
            <p key={key}>{key}</p>
          ))} */}
          <ul>
            {/* {sections.map(section => (
              <TocLink key={section.props.id} id={section.props.id}>
              {section.props.headingText}
              </TocLink>
            ))} */}
            {tocLinks}
          </ul>
          {sidebarContent}
        </>
      }
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

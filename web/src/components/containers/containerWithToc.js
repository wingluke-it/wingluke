import React, { useState, useEffect } from "react"
// import styles from "./containerWithToc.module.scss"

import TocLink from "../tocLink"
import ContainerWithSidebar from "./containerWithSidebar"
import MainColumn from "./mainColumn"

/*
 * The list of our ToC Titles (Sections) as keys, with their
 * Y-pixel position on the page as the values
 * 'Top' generically references the top of the page
 */
const mi = {
  // top: 0,
  // overview: null,
  // images: null,
  // "featured-artists": null,
  // "curation-process": null,
  // thanks: null,
}

/* sections: an array of TocSections */
const ContainerWithToc = ({ sidebarContent, sections, children }) => {
  // for (const section of sections) {
  //   mi[section.props.id] = null
  // }

  const [menuItems, setMenuItems] = useState(mi)
  // for (const sec in sections) {
  //   menuItems[sec.props.id] = null
  // }

  /*
   * Store the active tocItem in state to force update
   * when changed
   */
  const [activeItem, setActiveItem] = useState(null)

  /*
   * The MutationObserver allows us to watch for a few different
   * events, including page resizing when new elements might be
   * added to the page (potentially changing the location of our
   * anchor points)
   * We also listen to the scroll event in order to update based
   * on our user's scroll depth
   */
  useEffect(() => {
    const observer = new MutationObserver(getAnchorPoints)
    observer.observe(document.getElementById("root"), {
      childList: true,
      subtree: true,
    })
    window.addEventListener("scroll", handleScroll)
  }, [])

  /*
   * Programmatically determine where to set AnchorPoints for our Menu
   */
  const getAnchorPoints = () => {
    const curScroll = window.scrollY

    // const viewPortHeight = Math.max(
    //   document.documentElement.clientHeight,
    //   window.innerHeight || 0
    // )
    for (const section of sections) {
      const id = section.props.id
      mi[id] =
        document.getElementById(id).getBoundingClientRect().top + curScroll
      setMenuItems(mi)
    }
    console.log(menuItems)
    // const bottom = document.body.offsetHeight
    handleScroll()
  }

  const handleScroll = () => {
    const curPos = window.scrollY + 105
    console.log(curPos)
    let curId = menuItems[0]
    /*
     * Iterate through our sections object to find which section matches with
     * the current scrollDepth of the user.
     * NOTE: This code assumes that the sections object is built with an 'ordered'
     * list of sections, with the lowest depth (top) section first and greatest
     * depth (bottom) section last
     * If your items are out-of-order, this code will not function correctly
     */
    for (const id in menuItems) {
      if (curPos >= menuItems[id]) {
        curId = id
      } else {
        break
      }
    }
    if (curId !== activeItem) {
      setActiveItem(curId)
    }
  }

  /*
   * Create the list of MenuItems based on the menuItems object we have defined above
   */
  const menuList = sections.map((section, index) => (
    <TocLink
      id={section.props.id}
      key={`menuitem_${index}`}
      active={section.props.id === activeItem ? true : false}
    >
      {section.props.headingText}
    </TocLink>
  ))

  return (
    <ContainerWithSidebar
      sidebarContent={
        // TOC
        <>
          <ul>
            {/* {sections.map(section => (
              <TocLink key={section.props.id} id={section.props.id}>
                {section.props.headingText}
              </TocLink>
            ))} */}
            {menuList}
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

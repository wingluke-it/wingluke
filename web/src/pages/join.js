import React, { useRef, useState } from "react"

import Banner from "../components/banner"
import ButtonStyledA from "../components/base_elements/buttonStyledA"
import { FiInfo } from "@react-icons/all-files/fi/FiInfo"
import MembershipLevelCard from "../components/membershipLevelCard"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import WingTooltip from "../components/base_elements/wingTooltip"
import classNames from "classnames"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import styles from "./join.module.scss"

const JoinPage = ({
  data: {
    membershipInfo: { joinLink, title, subtitle, intro, coreBenefits, banner },
    allSanityMembershipLevel,
  },
}) => {
  // MEMBERSHIP LEVEL CARDS
  const membershipLevelNodes = mapEdgesToNodes(allSanityMembershipLevel) ?? []
  const membershipLevelCards = membershipLevelNodes
    .sort(
      (
        {
          yearlyPrice: price1 = Number.MAX_SAFE_INTEGER,
          numChildGuests: children1,
          numAdultGuests: adults1,
        },
        {
          yearlyPrice: price2 = Number.MAX_SAFE_INTEGER,
          numChildGuests: children2,
          numAdultGuests: adults2,
        }
      ) =>
        1000 * (price1 - price2) + (children1 + adults1 - children2 - adults2)
    )
    .map((membershipInfo, index) => (
      <MembershipLevelCard
        key={index}
        joinLink={joinLink}
        membershipInfo={membershipInfo}
      />
    ))

  // SLIDER IMPLEMENTATION
  // TODO add responsiveness for scrolling
  const memCards = useRef(null)
  const [scrolledLeft, setScrolledLeft] = useState(true)
  const [scrolledRight, setScrolledRight] = useState(false)
  const scrollLeft = () => {
    const firstCard = memCards.current.firstElementChild
    const firstCardMarginRight = parseFloat(
      getComputedStyle(firstCard).marginRight
    )
    const scrollDistance = (firstCard.scrollWidth + firstCardMarginRight) * -1
    if (scrollDistance * -1 >= memCards.current.scrollLeft) {
      setScrolledLeft(true)
    }
    memCards.current.scrollBy({ left: scrollDistance, behavior: "smooth" })

    if (scrolledRight) {
      setScrolledRight(false)
    }
  }
  const scrollRight = () => {
    const firstCard = memCards.current.firstElementChild
    const firstCardMarginRight = parseFloat(
      getComputedStyle(firstCard).marginRight
    )
    const scrollDistance = firstCard.scrollWidth + firstCardMarginRight
    const maxScrollLeft =
      memCards.current.scrollWidth - memCards.current.clientWidth
    if (scrollDistance >= maxScrollLeft - memCards.current.scrollLeft) {
      setScrolledRight(true)
    }
    memCards.current.scrollBy({ left: scrollDistance, behavior: "smooth" })

    if (scrolledLeft) {
      setScrolledLeft(false)
    }
  }

  let ticking = false
  const handleScroll = event => {
    // lastKnownScrollPosition = memCards.current.scrollX
    const maxScroll =
      memCards.current.scrollWidth - memCards.current.clientWidth
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (memCards.current.scrollLeft === 0 && !scrolledLeft) {
          setScrolledLeft(true)
        } else if (memCards.current.scrollLeft >= maxScroll && !scrolledRight) {
          setScrolledRight(true)
        } else if (memCards.current.scrollLeft > 0 && scrolledLeft) {
          setScrolledLeft(false)
        } else if (memCards.current.scrollLeft < maxScroll && scrolledRight) {
          setScrolledRight(false)
        }
        ticking = false
      })

      ticking = true
    }
  }

  // CORE BENEFITS and FOOTNOTES
  const footnotesMap = new Map()
  const coreBenefitsList = coreBenefits
    .filter(({ title }) => title && title.en)
    .map(({ title, description, footnotes }, index) => {
      let titleString = title.en
      footnotes.forEach(footnote => {
        if (!footnotesMap.has(footnote)) {
          footnotesMap.set(footnote, "*".repeat(footnotesMap.size + 1) + " ")
        }
        titleString += footnotesMap.get(footnote)
      })
      return (
        <React.Fragment key={index}>
          <dt>
            {titleString}
            {description?.en && (
              <>
                {" "}
                <WingTooltip content={description.en}>
                  <FiInfo />
                </WingTooltip>
              </>
            )}
          </dt>
          {/* {description?.en && <dd>{description.en}</dd>} */}
        </React.Fragment>
      )
    })
  const footnotesList = []
  footnotesMap.forEach((symbol, footnote) =>
    footnotesList.push(
      <li key={symbol}>
        {symbol} {footnote}
      </li>
    )
  )

  return (
    <>
      <SEO
        title="Membership"
        description="Learn about the different membership levels available at Wing Luke Museum."
        // image={banner}
      />
      {banner && <Banner figure={banner} />}
      <TitleSection
        title={(title && title.en) ?? "Become a Member"}
        subtitle={subtitle && subtitle.en}
        beforeText={"Join"}
        after={
          <div className={styles.titleSectionAfterContainer}>
            {intro && intro.en && (
              <p className={styles.titleSectionIntro}>{intro.en}</p>
            )}
            <div className={styles.titleSectionButtonContainer}>
              <ButtonStyledA href={joinLink} text={"Join"} newtab={true} />
              <ButtonStyledA href={joinLink} text={"Renew"} newtab={true} />
            </div>
          </div>
        }
      />
      <div className={styles.memCardsContainer} onScroll={handleScroll}>
        <button
          onClick={scrollLeft}
          className={classNames(
            styles.scrollButtonLeft,
            scrolledLeft ? "fadeOut" : "fadeIn"
          )}
          aria-hidden={true}
        >
          {"<"}
        </button>
        <button
          onClick={scrollRight}
          className={classNames(
            styles.scrollButtonRight,
            scrolledRight ? "fadeOut" : "fadeIn"
          )}
          aria-hidden={true}
        >
          {">"}
        </button>
        <div ref={memCards} className={styles.memCards}>
          {membershipLevelCards}
        </div>
      </div>
      <div className={styles.coreBenefits}>
        <h2>All Levels Include</h2>
        {/* TODO categorize into discounts, early access, museum freebies/bonuses */}
        <dl className={styles.coreBenefitsList}>{coreBenefitsList}</dl>
        <ul className={styles.coreBenefitsFootnotes}>{footnotesList}</ul>
      </div>
      {/* TODO contact email and phone */}
      {/* TODO FAQ */}
      {/* <ReactTooltip effect={"solid"} place={"bottom"} /> */}
    </>
  )
}

export default JoinPage

export const query = graphql`
  {
    membershipInfo: sanityMembershipProgram {
      title {
        en
      }
      subtitle {
        en
      }
      intro {
        en
      }
      joinLink
      coreBenefits {
        title {
          en
        }
        description {
          en
        }
        footnotes
      }
      phone
      email
      faqs {
        question {
          en
        }
        answer {
          en
        }
      }
      banner {
        ...SanityImage
      }
    }
    allSanityMembershipLevel {
      edges {
        node {
          name {
            en
          }
          paymentType
          yearlyPrice
          yearlyPriceMaximum
          numMemberCards
          numChildGuests
          numAdultGuests
          narmIncluded
          numCardsDonated
          featuredBenefits {
            title {
              en
            }
            description {
              en
            }
            footnotes
          }
          inheritsFrom {
            name {
              en
            }
          }
          additionalBenefits {
            title {
              en
            }
            description {
              en
            }
            footnotes
          }
          tagline {
            en
          }
          banner {
            ...SanityImage
          }
        }
      }
    }
  }
`

import React, { useRef, useState } from "react"

import Banner from "../components/banner"
import ButtonStyledA from "../components/base_elements/buttonStyledA"
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt"
import { FiInfo } from "@react-icons/all-files/fi/FiInfo"
import { MdEmail } from "@react-icons/all-files/md/MdEmail"
import MembershipLevelCard from "../components/membershipLevelCard"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import WingTooltip from "../components/base_elements/wingTooltip"
import classNames from "classnames"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"
import styles from "./join.module.scss"

const ContactOption = ({ icon, children }) => (
  <div className={styles.contactOption}>
    <span className={styles.contactOptionIcon}>{icon}</span>{" "}
    <span className={styles.contactOptionInfo}>{children}</span>
  </div>
)

const JoinPage = ({
  data: {
    membershipInfo: {
      joinLink,
      title,
      subtitle,
      intro,
      coreBenefits,
      banner,
      phone,
      email,
    },
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

  // CONTACT INFO
  const phoneSplit = phone ? phone.split(" ") : []
  const phoneNum =
    phoneSplit.length > 0 ? phoneSplit[0].replaceAll("-", "") : ""
  const ext = phoneSplit.length > 1 ? phoneSplit[1].replace("x", "w") : ""
  const contactInfo = (
    <div className={styles.contactInfo}>
      <p>You may also join or renew by phone and email:</p>
      <div className={styles.contactInfoOptions}>
        {email && (
          <ContactOption icon={<MdEmail />}>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {email}
            </a>
          </ContactOption>
        )}
        {phone && (
          <ContactOption icon={<FaPhoneAlt />}>
            <a href={`tel:+1${phoneNum}${ext}`}>{phone}</a>
          </ContactOption>
        )}
      </div>
    </div>
  )

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
          <div className={styles.titleSection}>
            {intro && intro.en && (
              <p className={styles.titleSectionIntro}>{intro.en}</p>
            )}
            <p>Join or renew online:</p>
            <div className={styles.titleSectionButtonContainer}>
              <ButtonStyledA href={joinLink} text={"Join"} newtab={true} />
              <ButtonStyledA href={joinLink} text={"Renew"} newtab={true} />
            </div>
            {contactInfo}
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

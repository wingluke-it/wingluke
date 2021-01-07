import { Link, graphql, useStaticQuery } from "gatsby"

import { AiFillIdcard } from "@react-icons/all-files/ai/AiFillIdcard"
import { AiOutlineIdcard } from "@react-icons/all-files/ai/AiOutlineIdcard"
import ButtonStyledA from "./base_elements/buttonStyledA"
import { FaChild } from "@react-icons/all-files/fa/FaChild"
import { FiInfo } from "@react-icons/all-files/fi/FiInfo"
import Figure from "./figure"
import Img from "gatsby-image"
import { IoPersonAdd } from "@react-icons/all-files/io5/IoPersonAdd"
import PropTypes from "prop-types"
import React from "react"
import WingTooltip from "./base_elements/wingTooltip"
import styles from "./membershipLevelCard.module.scss"
import { useDonationLink } from "../hooks/useDonationLink"

const MembershipLevelCard = ({
  joinLink,
  membershipInfo: {
    name = {},
    yearlyPrice,
    paymentType,
    yearlyPriceMaximum,
    numMemberCards,
    numChildGuests,
    numAdultGuests,
    numCardsDonated,
    narmIncluded,
    featuredBenefits,
    inheritsFrom,
    tagline,
    banner,
  },
  href,
}) => {
  const donationLink = useDonationLink()
  const buttonLink = paymentType === "range" ? donationLink : joinLink
  const memberCards = []
  for (let i = 0; i < numMemberCards; i++) {
    memberCards.push(<AiFillIdcard key={i} />)
  }
  const adultGuests = []
  for (let i = 0; i < numAdultGuests; i++) {
    adultGuests.push(<IoPersonAdd key={i} />)
  }
  const childGuests = []
  for (let i = 0; i < numChildGuests; i++) {
    childGuests.push(<FaChild key={i} />)
  }
  const cardsDonated = []
  for (let i = 0; i < numCardsDonated; i++) {
    cardsDonated.push(<AiOutlineIdcard key={i} />)
  }
  const narmLogoData = useStaticQuery(graphql`
    query {
      narmLogo: file(relativePath: { eq: "narm-logo.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const narmLogoFixed = narmLogoData?.narmLogo?.childImageSharp?.fixed

  let priceString = yearlyPrice ? `$${yearlyPrice}` : ""
  if (yearlyPrice && paymentType === "range") {
    yearlyPriceMaximum
      ? (priceString += ` - $${yearlyPriceMaximum}`)
      : (priceString += "+")
  }
  let membersTooltipInfo = []
  if (numMemberCards > 0)
    membersTooltipInfo.push(`${numMemberCards} member cards`)
  if (numCardsDonated > 0)
    membersTooltipInfo.push(<br />, `${numCardsDonated} cards donated`)
  if (numAdultGuests > 0)
    membersTooltipInfo.push(<br />, `${numAdultGuests} adult guests`)
  if (numChildGuests > 0)
    membersTooltipInfo.push(<br />, `${numChildGuests} child guests`)
  if (narmIncluded)
    membersTooltipInfo.push(
      <br />,
      <>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://narmassociation.org/"
        >
          NARM
        </a>{" "}
        card included
      </>
    )

  const card = (
    <div className={styles.card}>
      {tagline?.en && <span className={styles.tagline}>{tagline.en}</span>}
      <h3>{name.en ?? "Untitled"}</h3>
      {/* TODO memberCard and child/adult guest symbols */}
      <WingTooltip content={<span>{membersTooltipInfo}</span>}>
        <span className={styles.membersAndGuests}>
          {numMemberCards > 0 && (
            <div className={styles.memberCards}>{memberCards}</div>
          )}
          {numCardsDonated > 0 && (
            <>
              <span> + </span>
              <div className={styles.cardsDonated}>{cardsDonated}</div>
            </>
          )}
          {numAdultGuests > 0 && (
            <>
              <span> + </span>
              <div className={styles.adultGuests}>{adultGuests}</div>
            </>
          )}
          {numChildGuests > 0 && (
            <>
              <span> + </span>
              <div className={styles.childGuests}>{childGuests}</div>
            </>
          )}
          {narmIncluded && (
            <>
              <span> + </span>
              <Img className={styles.narmLogo} fixed={narmLogoFixed} />
            </>
          )}
        </span>
      </WingTooltip>
      {yearlyPrice && (
        <span className={styles.priceInfo}>
          <span className={styles.price}>{priceString}</span>
          {paymentType === "range" ? " yearly donation" : " per year"}
        </span>
      )}
      <div className={styles.buttonContainer}>
        <ButtonStyledA
          href={buttonLink}
          text={paymentType === "fixed" ? "Join / Renew" : "Donate"}
          newtab={true}
        />
      </div>
      {banner && (
        <Figure
          className={styles.cardBanner}
          figure={banner}
          displayCaption={false}
          dimensions={1 / 3}
          width={600}
        />
      )}
      {inheritsFrom?.name?.en && (
        <span className={styles.inheritsFrom}>
          Includes ALL benefits from: <br />
          <strong>{inheritsFrom.name.en}</strong> level membership.
        </span>
      )}
      {featuredBenefits.length > 0 && (
        <ul className={styles.featuredBenefits}>
          {featuredBenefits.map(({ title, description, footnotes }, i) => {
            return (
              title?.en && (
                <li key={i}>
                  {title.en}{" "}
                  {description?.en && (
                    <WingTooltip content={description.en}>
                      <FiInfo />
                    </WingTooltip>
                  )}
                </li>
              )
            )
          })}
        </ul>
      )}
    </div>
  )

  return href ? (
    <Link className={styles.inheritColor} to={href}>
      {card}
    </Link>
  ) : (
    card
  )
}

MembershipLevelCard.propTypes = {
  banner: PropTypes.object,
  membershipInfo: PropTypes.shape({
    name: PropTypes.shape({
      en: PropTypes.string.isRequired,
    }).isRequired,
    paymentType: PropTypes.string.isRequired,
    yearlyPrice: PropTypes.number,
    yearlyPriceMaximum: PropTypes.number,
    numMemberCards: PropTypes.number.isRequired,
    numChildGuests: PropTypes.number,
    numAdultGuests: PropTypes.number,
    numCardsDonated: PropTypes.number,
    narmIncluded: PropTypes.bool,
    featuredBenefits: PropTypes.array,
    inheritsFrom: PropTypes.object,
    tagline: PropTypes.object,
  }).isRequired,
  joinLink: PropTypes.string,
  href: PropTypes.string,
}

export default MembershipLevelCard

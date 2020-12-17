import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar"
import { BsClock } from "@react-icons/all-files/bs/BsClock"
import Details from "./details"
import Figure from "./figure"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./occurrenceCard.module.scss"

const OccurrenceCard = ({
  banner,
  title,
  subtitle,
  href,
  dateString,
  timeString,
  registeringString /* how to register */,
}) => {
  const details = []
  if (timeString) {
    details.push({
      icon: <BsClock title={"Time"} />,
      text: timeString,
    })
  }
  if (dateString) {
    details.push({
      icon: <BsCalendar title={"Date"} />,
      text: dateString,
    })
  }
  const card = (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        {subtitle && <p className={styles.cardBodySubtitle}>{subtitle}</p>}
        <Details details={details} />
      </div>
      {banner && (
        <Figure
          className={styles.cardBanner}
          figure={banner}
          displayCaption={false}
          dimensions={9 / 16}
        />
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

OccurrenceCard.propTypes = {
  banner: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  href: PropTypes.string,
  dateString: PropTypes.string,
  timeString: PropTypes.string,
  registeringString: PropTypes.string,
}

export default OccurrenceCard

import PropTypes from "prop-types"
import React from "react"
import styles from "./details.module.scss"

const Detail = ({ icon, text }) => (
  <div className={styles.detail}>
    <span className={styles.iconContainer}>{icon}</span>
    <span className={styles.detailText}>{text}</span>
  </div>
)

const Details = ({ details }) => (
  <div className={styles.details}>
    {details.map(({ icon, text }, index) => (
      <Detail key={`detail-${index}`} icon={icon} text={text} />
    ))}
  </div>
)

Details.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.exact({
      icon: PropTypes.any,
      text: PropTypes.string,
    })
  ),
}

export default Details

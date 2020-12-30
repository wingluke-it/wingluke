import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import styles from "./tabbedTitles.module.scss"

const TabbedTitles = ({ titles, dateToPass }) => (
  <>
    <div className={styles.titles}>
      {titles.map(({ title, href, activeTitle }, index) =>
        activeTitle ? (
          <h1 key={index} className={classNames("h2", styles.activeTitle)}>
            {title}
          </h1>
        ) : (
          <Link
            key={index}
            to={href}
            className={classNames("h2", styles.nonActiveTitle)}
            state={{
              datePassed: dateToPass,
            }}
            replace
          >
            {title}
          </Link>
        )
      )}
    </div>
    <hr />
  </>
)

TabbedTitles.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      href: PropTypes.string,
      activeTitle: PropTypes.bool,
    })
  ).isRequired,
}

export default TabbedTitles

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useState } from "react"
import styles from "./header.module.css"
import Logo from "../images/white-logo.png"

const Header = () => {
  const [mobileNavOpened, setMobileNavOpened] = useState(false)
  const toggleMobileNav = () => setMobileNavOpened(!mobileNavOpened)

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.nav} ${
          mobileNavOpened ? styles.dropdownOpened : ""
        }`}
      >
        <Link className={styles.homeLink} to="/">
          {/* TODO maybe use Gatsby Image here */}
          <img src={Logo} alt="WING LUKE MUSEUM" />
        </Link>

        <button
          className={styles.mobileDropdownToggle}
          onClick={toggleMobileNav}
          aria-hidden="true"
        >
          MENU
        </button>
        <div className={styles.dropdownLinkContainer}>
          <Link to="/visit">VISIT</Link>
          <Link to="/join">JOIN</Link>
          <Link to="/give">GIVE</Link>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

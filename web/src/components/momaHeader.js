import { Link } from "gatsby"
import Logo from "../images/wingluke-logo-white-horizontal.svg"
import React from "react"
import classNames from "classnames"
import styles from "./momaHeader.module.scss"

const MomaHeader = ({
  headerIsOpen,
  closeHeader,
  toggleHeader,
  headerIsHidden,
}) => {
  const MomaHeaderLink = ({ to = "/", text }) => (
    <Link
      onClick={toggleHeader}
      activeClassName={styles.activeLink}
      partiallyActive={true}
      to={to}
    >
      {text}
    </Link>
  )

  return (
    <header
      className={classNames(styles.header, {
        [styles.headerOpened]: headerIsOpen,
        [styles.headerIsHidden]: headerIsHidden,
      })}
    >
      <nav className={styles.nav}>
        <div className={styles.topBar}>
          <Link className={styles.homeLink} onClick={closeHeader} to="/">
            <img src={Logo} alt={"Wing Luke Museum Logo"} />
            {/* Wing Luke Museum */}
          </Link>
          <div className={styles.primaryItems}>
            <button onClick={toggleHeader}>
              {headerIsOpen ? "Close Menu" : "Open Menu"}
            </button>
          </div>
          <div className={styles.ctas}>
            <a href="https://25646p.blackbaudhosting.com/25646p/tickets?tab=3&txobjid=bbaa5cd3-98c2-442e-a4bc-da03e6093479">
              Buy Tickets
            </a>
          </div>
        </div>
        {/* {headerIsOpen && ( */}
        <div className={styles.expandingContainer}>
          <MomaHeaderLink to="/events" text="Events" />
          <MomaHeaderLink to="/exhibits" text="Exhibits" />
          <MomaHeaderLink to="/give" text="Give" />
          <MomaHeaderLink to="/join" text="Join" />
          <MomaHeaderLink to="/visit" text="Visit" />
          <MomaHeaderLink to="/sponsors" text="Sponsors" />
          <MomaHeaderLink to="/about" text="About" />
          <MomaHeaderLink to="/spaces" text="Event Space Usage" />
          <MomaHeaderLink to="/volunteer" text="Volunteer" />
        </div>
        {/* )} */}
      </nav>
    </header>
  )
}

export default MomaHeader

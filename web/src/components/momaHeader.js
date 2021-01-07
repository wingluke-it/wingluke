import { Link } from "gatsby"
import Logo from "../images/wingluke-logo-white-horizontal.svg"
import React from "react"
import classNames from "classnames"
import styles from "./momaHeader.module.scss"

const MomaHeader = React.forwardRef(
  ({ headerIsOpen, closeHeader, toggleHeader, headerIsHidden }, ref) => {
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
        ref={ref}
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
          <div
            className={classNames(styles.expandingContainer, {
              [styles.visibilityHidden]: !headerIsOpen,
            })}
          >
            <MomaHeaderLink to="/exhibits" text="Exhibits" />
            <MomaHeaderLink to="/events" text="Events" />
            <MomaHeaderLink to="/tours" text="Tours" />
            <MomaHeaderLink to="/give" text="Give" />
            <MomaHeaderLink to="/join" text="Join" />
            <MomaHeaderLink to="/visit" text="Visit" />
            <MomaHeaderLink to="/sponsors" text="Sponsors" />
            <MomaHeaderLink to="/about" text="About" />
            <MomaHeaderLink to="/spaces" text="Event Space Usage" />
            <MomaHeaderLink to="/volunteer" text="Volunteer" />
            {/* TODO add external links to collections, curriculum, and db .wingluke.org */}
          </div>
          {/* )} */}
        </nav>
      </header>
    )
  }
)

export default MomaHeader

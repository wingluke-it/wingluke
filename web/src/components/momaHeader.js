import { Link } from "gatsby"
import WideLogo from "../images/wingluke-logo-white-horizontal.svg"
import SmallLogo from "../images/wlm-white.svg"
import React from "react"
import classNames from "classnames"
import styles from "./momaHeader.module.scss"
import { useMediaQuery } from "react-responsive"

const MomaHeader = ({ headerIsOpen, closeHeader, toggleHeader }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" })

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

  const HeaderItem = ({ title, children }) => {
    return (
      <>
        <button onClick={toggleHeader}>{title}</button>
        {/* {headerIsOpen && ( */}
        <div
          className={classNames(styles.expandingContainer, {
            [styles.headerIsOpen]: headerIsOpen,
          })}
        >
          {children}
        </div>
      </>
    )
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.topBar}>
          {isMobile ? (
            <Link className={styles.homeLink} onClick={closeHeader} to="/">
              <img src={SmallLogo} alt={"Wing Luke Museum Logo"} />
            </Link>
          ) : (
            <Link className={styles.homeLink} onClick={closeHeader} to="/">
              <img src={WideLogo} alt={"Wing Luke Museum Logo"} />
            </Link>
          )}
          {/* Wing Luke Museum */}
          <div className={styles.ctas}>
            {/* TODO update with link from Sanity */}
            <a href="https://25646p.blackbaudhosting.com/25646p/tickets?tab=3&txobjid=bbaa5cd3-98c2-442e-a4bc-da03e6093479">
              {isMobile && "Tickets"}
              {!isMobile && "Buy Tickets"}
            </a>
            {/* TODO update with link from Sanity */}
            <a href="https://25646p.blackbaudhosting.com/25646p/tickets?tab=3&txobjid=bbaa5cd3-98c2-442e-a4bc-da03e6093479">
              {isMobile && "Join"}
              {!isMobile && isTablet && "Membership"}
              {!isMobile && !isTablet && "Become a Member"}
            </a>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.primaryItems}>
            <button onClick={toggleHeader}>
              {headerIsOpen ? "Close Menu" : "Open Menu"}
            </button>
          </div>
        </div>
        {/* {headerIsOpen && ( */}
        <div
          className={classNames(styles.expandingContainer, {
            [styles.headerIsOpen]: headerIsOpen,
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
          {/* TODO add external links to collections, curriculum, shop, and db .wingluke.org */}
        </div>
      </nav>
    </header>
  )
}

export default MomaHeader

import { Link } from "gatsby"
import Logo from "../images/white-logo.png"
import React from "react"
import classNames from "classnames"
import styles from "./momaHeader.module.scss"

const MomaHeader = ({
  headerIsOpen,
  closeHeader,
  toggleHeader,
  headerIsHidden,
}) => {
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
          <Link
            onClick={toggleHeader}
            activeClassName={styles.activeLink}
            partiallyActive={true}
            to="/exhibits"
          >
            Exhibits
          </Link>
          <Link
            onClick={toggleHeader}
            activeClassName={styles.activeLink}
            partiallyActive={true}
            to="/events"
          >
            Events
          </Link>
        </div>
        {/* )} */}
      </nav>
    </header>
  )
}

export default MomaHeader

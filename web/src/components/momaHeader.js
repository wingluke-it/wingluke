import { Link } from "gatsby"
import WideLogo from "../images/wingluke-logo-white-horizontal.svg"
import SmallLogo from "../images/wlm-white.svg"
import React, { useContext } from "react"
import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown"
import { AiFillCaretUp } from "@react-icons/all-files/ai/AiFillCaretUp"
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle"
import classNames from "classnames"
import styles from "./momaHeader.module.scss"
import { useMediaQuery } from "react-responsive"

const HeaderContext = React.createContext()
const MomaHeaderLink = ({ to = "/", text }) => (
  <Link activeClassName={styles.activeLink} partiallyActive={true} to={to}>
    {text}
  </Link>
)

const HeaderItem = ({ title, links }) => {
  const { toggleHeader, headerItemOpened } = useContext(HeaderContext)
  return (
    <>
      <button
        onClick={() => toggleHeader(title)}
        className={classNames({ [styles.front]: headerItemOpened === title })}
      >
        <span className={styles.headerTitle}>{title}</span>
        <span className={styles.closeHeaderIcon}>
          {headerItemOpened === title ? (
            <AiFillCloseCircle />
          ) : (
            <AiFillCaretDown />
          )}
        </span>
      </button>
      <div
        className={classNames(styles.expandingContainer, {
          [styles.headerIsOpen]: Boolean(headerItemOpened),
          [styles.front]: headerItemOpened === title,
        })}
      >
        <div className={styles.headerItemLinks}>
          {links.map(({ to, text }, index) => (
            <MomaHeaderLink to={to} text={text} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

const MomaHeader = ({ headerItemOpened, toggleHeader, transparent }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" })

  return (
    <header
      className={classNames(
        {
          [styles.opened]: Boolean(headerItemOpened),
          [styles.transparent]: transparent,
        },
        styles.header
      )}
    >
      <nav className={styles.nav}>
        <div className={styles.topBar}>
          <Link
            className={styles.homeLink}
            to="/"
            activeClassName={styles.logoActive}
          >
            <img
              src={SmallLogo}
              className={styles.smallLogo}
              alt={"Wing Luke Museum Logo"}
            />
            <img
              src={WideLogo}
              className={styles.wideLogo}
              alt={"Wing Luke Museum Logo"}
            />
          </Link>
          {/* TODO add icons for these CTAs for at least mobile */}
          <div className={styles.ctas}>
            <Link
              to="/visit/tickets"
              activeClassName={styles.activeCta}
              // partiallyActive={true}
            >
              {isMobile && "Tickets"}
              {!isMobile && "Buy Tickets"}
            </Link>
            <Link
              to="/join"
              activeClassName={styles.activeCta}
              // partiallyActive={true}
            >
              {isMobile && "Join"}
              {!isMobile && isTablet && "Membership"}
              {!isMobile && !isTablet && "Become a Member"}
            </Link>
            <Link
              to="/give"
              activeClassName={styles.activeCta}
              // partiallyActive={true}
            >
              {isMobile && "Give"}
              {!isMobile && isTablet && "Donate"}
              {!isMobile && !isTablet && "Donate"}
            </Link>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <HeaderContext.Provider
            value={{
              headerItemOpened,
              toggleHeader,
            }}
          >
            <HeaderItem
              title={isMobile ? "What's On" : "Calendar"}
              links={[
                { to: "/exhibits", text: "Exhibits" },
                { to: "/events", text: "Events" },
                { to: "/tours", text: "Tours" },
              ]}
            />
            <HeaderItem
              title={"Visit"}
              links={[
                // { to: "/visit", text: "Plan Your Visit" },
                { to: "/visit/tickets", text: "Tickets" },
                { to: "/visit/hours", text: "Hours" },
              ]}
            />
            <HeaderItem
              // title={"Learn"}
              title={"Learn"}
              links={[
                { to: "/about", text: "About" },
                /* {
                  to: "https://curriculum.wingluke.org",
                  text: "Curriculum",
                  external: true,
                }, // TODO
                {
                  to: "https://db.wingluke.org/",
                  text: "Collections",
                  external: true,
                }, // TODO */
              ]}
            />
            <HeaderItem
              title={"Shop"}
              // externalLink={"https://digitalwingluke.org/shop"} TODO
              links={[
                { to: "/join", text: "Join" },
                { to: "/give", text: "Give" },
              ]}
            />
          </HeaderContext.Provider>
          {/* <HeaderItem title={"External"} toggleHeader={toggleHeader}>
              <MomaHeaderLink to="/shop" text="Shop" />
            </HeaderItem> */}
        </div>
        <button
          className={classNames(styles.closeButton, {
            [styles.closeButtonShown]: Boolean(headerItemOpened),
          })}
          onClick={() => toggleHeader(null)}
        >
          Close <AiFillCaretUp />
        </button>
        <div
          className={classNames(styles.expandingContainerBg, {
            [styles.headerIsOpen]: Boolean(headerItemOpened),
          })}
        ></div>
        {/* <div
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
          {TODO add external links to collections, curriculum, shop, and db .wingluke.org }
        </div> */}
      </nav>
    </header>
  )
}

export default MomaHeader

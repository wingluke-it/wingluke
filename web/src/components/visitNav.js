import { graphql, useStaticQuery } from "gatsby"

import MenuNav from "./menuNav"
import React from "react"

const VisitNav = () => {
  const {
    sanityTickets,
    sanityVisitorGuide,
    sanityHours,
  } = useStaticQuery(graphql`
    {
      sanityVisitorGuide {
        title {
          en
        }
      }
      sanityTickets {
        title {
          en
        }
      }
      sanityHours {
        title {
          en
        }
      }
    }
  `)
  const visitTitle = sanityVisitorGuide?.title?.en ?? "Plan Your Visit"
  return (
    <MenuNav
      breakpoint={767}
      title={visitTitle}
      navItems={[
        {
          to: "/visit",
          text: visitTitle,
        },
        {
          to: "/visit/tickets",
          text: sanityTickets?.title?.en ?? "Ticket Prices",
        },
        {
          to: "/visit/hours",
          text: sanityHours?.title?.en ?? "Hours",
        },
        {
          to: "/visit/getting-here",
          text: "Getting Here", // TODO update to sanity field
        },
        {
          to: "/visit/museum-map",
          text: "Museum Map", // TODO update to sanity field
        },
        {
          to: "/visit/the-neighborhood",
          text: "The Neighborhood", // TODO update to sanity field
        },
        {
          to: "/visit/accessibility",
          text: "Accessibility", // TODO update to sanity field
        },
        // TODO BL's gravesite? FAQ? booking a tour?
      ]}
    />
    /* <nav>
      <Link to={"/visit"}>
        {sanityVisitorGuide?.title?.en ?? "Plan Your Visit"}
      </Link>
      <Link to={"/visit/tickets"}>
        {sanityTickets?.title?.en ?? "Ticket Prices"}
      </Link>
    </nav> */
  )
}

export default VisitNav

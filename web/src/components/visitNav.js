import { Link, graphql, useStaticQuery } from "gatsby"

import React from "react"

const VisitNav = () => {
  const { sanityTickets, sanityVisitorGuide } = useStaticQuery(graphql`
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
    }
  `)
  return (
    <nav>
      <Link to={"/visit"}>
        {sanityVisitorGuide?.title?.en ?? "Plan Your Visit"}
      </Link>
      <Link to={"/visit/tickets"}>
        {sanityTickets?.title?.en ?? "Ticket Prices"}
      </Link>
    </nav>
  )
}

export default VisitNav

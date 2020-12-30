import ButtonStyledA from "../../components/base_elements/buttonStyledA"
import React from "react"
import SEO from "../../components/seo"
import TitleSection from "../../components/titleSection"
import VisitNav from "../../components/visitNav"
import { graphql } from "gatsby"

const TicketsPage = ({
  data: {
    sanityTickets: { title, subtitle, intro, ticketPurchaseLink, ticketTypes },
  },
}) => {
  return (
    <>
      <SEO
        title={title?.en ?? "Tickets"}
        description={
          subtitle?.en ??
          "Ticket prices and discounts for general admission to Wing Luke Museum"
        }
        // image={banner}
      />
      <TitleSection title={title?.en ?? "Tickets"} />
      <VisitNav />
      {ticketPurchaseLink && (
        <ButtonStyledA
          href={ticketPurchaseLink}
          newtab={true}
          text={"Buy Tickets"}
        />
      )}
    </>
  )
}

export default TicketsPage

export const query = graphql`
  {
    sanityTickets {
      title {
        en
      }
      subtitle {
        en
      }
      intro {
        en
      }
      ticketPurchaseLink
      ticketTypes {
        name {
          en
        }
        price
        ageRange {
          en
        }
      }
    }
  }
`

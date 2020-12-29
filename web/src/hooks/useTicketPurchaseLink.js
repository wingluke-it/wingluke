import { graphql, useStaticQuery } from "gatsby"

export const useTicketPurchaseLink = () => {
  const { sanityTickets } = useStaticQuery(
    graphql`
      {
        sanityTickets {
          ticketPurchaseLink
        }
      }
    `
  )

  return sanityTickets.ticketPurchaseLink
}

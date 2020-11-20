import { useStaticQuery, graphql } from "gatsby"

export const useTicketPurchaseLink = () => {
  const { sanityVisitorGuide } = useStaticQuery(
    graphql`
      {
        sanityVisitorGuide {
          ticketPurchaseLink
        }
      }
    `
  )

  return sanityVisitorGuide.ticketPurchaseLink
}

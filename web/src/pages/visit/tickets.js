import ButtonStyledA from "../../components/base_elements/buttonStyledA"
import PortableText from "../../components/portableText"
import React from "react"
import SEO from "../../components/seo"
import TitleSection from "../../components/titleSection"
import VisitLayout from "../../components/visitLayout"
import { graphql } from "gatsby"
import styles from "./tickets.module.scss"

const TicketPrice = ({ ticketType: { name, price, whoQualifies } }) =>
  name?.en && price ? (
    <li>
      <span>
        <strong>{name?.en}</strong> <br />
        {whoQualifies?.en ? `(${whoQualifies.en})` : ""}
      </span>
      <span>{price}</span>
    </li>
  ) : null

const GaTickets = ({ ticketTypes }) => (
  <ul className={styles.ticketsList}>
    {ticketTypes.map((ticketType, index) => (
      <TicketPrice key={index} ticketType={ticketType} />
    ))}
  </ul>
)

const TicketsPage = ({
  data: {
    sanityTickets: {
      title,
      subtitle,
      description,
      ticketPurchaseLink,
      ticketTypes,
      _rawGaInfo,
      _rawAdditionalInfo,
    },
  },
}) => {
  const ticketsSubtitle = subtitle?.en
  const ticketsDescription =
    description?.en ??
    "Ticket prices and discounts for general admission to Wing Luke Museum."

  return (
    <>
      <SEO
        title={title?.en ?? "Tickets"}
        description={ticketsDescription}
        // image={banner}
      />
      <VisitLayout>
        <TitleSection
          title={title?.en ?? "Tickets"}
          subtitle={ticketsSubtitle}
          after={<p>{ticketsDescription}</p>}
        />
        <section>
          <h2>General Admission</h2>
          <div className={styles.gaContainer}>
            <div className={styles.buttonContainer}>
              {ticketPurchaseLink && (
                <ButtonStyledA
                  href={ticketPurchaseLink}
                  newtab={true}
                  text={"Buy Tickets"}
                />
              )}
            </div>
            <GaTickets ticketTypes={ticketTypes} />
          </div>
          {_rawGaInfo?.en && <PortableText blocks={_rawGaInfo.en} />}
        </section>
        {_rawAdditionalInfo?.en && (
          <section>
            <h2>Additional Information</h2>
            <PortableText blocks={_rawAdditionalInfo.en} />
          </section>
        )}
      </VisitLayout>
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
      description {
        en
      }
      ticketPurchaseLink
      ticketTypes {
        name {
          en
        }
        price
        whoQualifies {
          en
        }
      }
      _rawGaInfo
      _rawAdditionalInfo
    }
  }
`

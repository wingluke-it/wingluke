import Banner from "../components/banner"
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar"
import { BsClock } from "@react-icons/all-files/bs/BsClock"
import ButtonStyledA from "../components/base_elements/buttonStyledA"
import DocsLayout from "../components/layouts/docsLayout"
import { GiAges } from "@react-icons/all-files/gi/GiAges"
import { GiPathDistance } from "@react-icons/all-files/gi/GiPathDistance"
import PortableText from "../components/portableText"
import React from "react"
import SEO from "../components/seo"
import TitleSection from "../components/titleSection"
import TocLayout from "../components/layouts/tocLayout"
import { graphql } from "gatsby"
import styles from "./tour.module.scss"
import { toPlainText } from "../lib/helpers"
import { useMediaQuery } from "react-responsive"

const Detail = ({ icon, text }) => (
  <div className={styles.detail}>
    <span className={styles.iconContainer}>{icon}</span>
    <span className={styles.detailText}>{text}</span>
  </div>
)

const Tour = ({
  data: {
    tour: {
      title,
      subtitle,
      type,
      scheduleDetails,
      _rawOverview,
      _rawPrivateGroupContact,
      _rawAccessibilityInfo,
      bookingLink,
      banner,
      duration,
      walkingDistance,
      recommendedAudience,
    },
  },
}) => {
  const essentialDetails = (
    <>
      <div className={styles.details}>
        <Detail
          icon={<BsCalendar title={"Public Schedule"} />}
          text={"calendar schedule goes here"}
        />
      </div>
      <div className={styles.details}>
        {duration && (
          <Detail
            icon={<BsClock title={"Time"} />}
            text={`${duration} minutes`}
          />
        )}
        {walkingDistance && (
          <Detail
            icon={<GiPathDistance title={"Distance"} />}
            text={`${walkingDistance} miles`}
          />
        )}
        {recommendedAudience && recommendedAudience.en && (
          <Detail
            icon={<GiAges title={"Recommended Audience"} />}
            text={`${recommendedAudience.en}`}
          />
        )}
      </div>
    </>
  )

  const sectionTitlesAndContent = {}
  if (_rawOverview && _rawOverview.en) {
    sectionTitlesAndContent["Overview"] = (
      <PortableText blocks={_rawOverview.en} />
    )
  }
  if (_rawPrivateGroupContact && _rawPrivateGroupContact.en) {
    sectionTitlesAndContent["Schedule a Private Tour"] = (
      <div>
        <PortableText blocks={_rawPrivateGroupContact.en} />
      </div>
    )
  }
  if (_rawAccessibilityInfo && _rawAccessibilityInfo.en) {
    sectionTitlesAndContent["Accessibility"] = (
      <div>
        <PortableText blocks={_rawAccessibilityInfo.en} />
      </div>
    )
  }

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" })

  return (
    <>
      <SEO
        title={(title && title.en) || "Untitled"}
        description={
          _rawOverview && _rawOverview.en && toPlainText(_rawOverview.en)
        }
        image={banner}
      />
      <article>
        <TitleSection
          title={title && title.en}
          subtitle={subtitle && subtitle.en}
          beforeText={!type || type === "No type" ? "TOUR" : type.toUpperCase()}
          after={
            <>
              <div className={styles.buttonsContainer}>
                {bookingLink && (
                  <ButtonStyledA
                    href={bookingLink}
                    newtab={true}
                    text={"Book Tickets"}
                  />
                )}
              </div>
              {isTabletOrMobile && essentialDetails}
            </>
          }
        />
        <Banner figure={banner} />
        <DocsLayout
          main={
            <>
              <TocLayout
                sectionTitlesAndContent={sectionTitlesAndContent}
                headersHiddenAtBreakpoint={false}
                hideTocNav={true}
              />
            </>
          }
          // TODO actually maybe sidebar should contain links to other tours
          sidebar={essentialDetails}
        />
      </article>
    </>
  )
}

export default Tour

export const query = graphql`
  query TourTemplateQuery($id: String!) {
    tour: sanityTour(id: { eq: $id }) {
      title {
        en
      }
      subtitle {
        en
      }
      scheduleDetails
      banner {
        ...SanityImage
      }
      type
      _rawOverview
      _rawPrivateGroupContact
      _rawAccessibilityInfo
      duration
      walkingDistance
      bookingLink
      recommendedAudience {
        en
      }
    }
  }
`

import PortableText from "../../components/portableText"
import React from "react"
import SEO from "../../components/seo"
import TitleSection from "../../components/titleSection"
import VisitLayout from "../../components/visitLayout"
import { graphql } from "gatsby"
import styles from "./hours.module.scss"

const HoursPage = ({
  data: {
    sanityHours: {
      title,
      subtitle,
      description,
      _rawHours,
      daysClosed,
      _rawAdditionalInfo,
    },
  },
}) => {
  const hoursTitle = title?.en ?? "Hours"
  const hoursDescription =
    description?.en ?? "Building hours of Wing Luke Museum"
  return (
    <>
      <SEO
        title={hoursTitle}
        description={hoursDescription}
        // image={banner}
      />
      {/* banner here */}
      <VisitLayout>
        <TitleSection
          title={hoursTitle}
          subtitle={subtitle?.en}
          after={<p>{hoursDescription}</p>}
        />
        {_rawHours?.en && (
          <section>
            <h2>Building Hours</h2>
            <PortableText blocks={_rawHours.en} />
          </section>
        )}
        {daysClosed.length > 0 && (
          <section>
            <h2>Days Closed</h2>
            <div className={styles.daysClosed}>
              {daysClosed.map((day, index) =>
                day?.en ? <span key={index}>{day.en}</span> : null
              )}
            </div>
          </section>
        )}
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

export default HoursPage

export const query = graphql`
  {
    sanityHours {
      title {
        en
      }
      subtitle {
        en
      }
      description {
        en
      }
      _rawHours
      daysClosed {
        en
      }
      _rawAdditionalInfo
    }
  }
`

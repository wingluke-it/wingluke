import React from "react"
import { graphql, Link } from "gatsby"
import { toPlainText } from "../lib/helpers"
import { isAfter, isBefore, parse, isSameDay, format } from "date-fns"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ContainerWithToc from "../components/containers/containerWithToc"

import ButtonStyledA from "../components/base_elements/buttonStyledA"
import ButtonStyledLink from "../components/base_elements/buttonStyledLink"
import Banner from "../components/banner"
import ExcerptWithLink from "../components/excerptWithLink"
import Figure from "../components/figure"
import ImageGallery from "../components/imageGallery"
import PortableText from "../components/portableText"
import TitleSection from "../components/titleSection"

import styles from "./exhibit.module.scss"
import TocSection from "../components/containers/tocSection"

const ExhibitTemplate = props => {
  const {
    title,
    subtitle,
    banner,
    _rawOverview,
    imageGallery,
    openingDate,
    closingDate,
    _rawGallery,
    featuredArtists,
    curatedBy,
  } = props.data && props.data.exhibit
  const { ticketPurchaseLink } = props.data && props.data.sanityVisitorGuide

  const statuses = {
    noStatus: "EXHIBIT",
    current: "EXHIBIT | Now on View",
    ongoing: "EXHIBIT | Always on View",
    upcoming: "Upcoming Exhibit",
    past: "Past Exhibit",
    traveling: "Traveling Exhibit (for rent)",
  }
  let exhibitStatus
  let secondaryStatus
  const today = new Date()
  const oDate = openingDate && parse(openingDate, "yyyy-MM-dd", new Date())
  const cDate = closingDate && parse(closingDate, "yyyy-MM-dd", new Date())
  if (!oDate) {
    exhibitStatus = statuses.noStatus
  } else if (isSameDay(today, oDate)) {
    exhibitStatus = cDate ? statuses.current : statuses.ongoing
    secondaryStatus = "Opening today!"
  } else if (isBefore(today, oDate)) {
    exhibitStatus = statuses.upcoming
    secondaryStatus = `Opens ${format(oDate, "PPPP")}`
  } else if (isAfter(today, oDate)) {
    if (!cDate) {
      exhibitStatus = statuses.ongoing
    } else if (isSameDay(today, cDate)) {
      exhibitStatus = statuses.current
      secondaryStatus = `Closes today (last day to view)`
    } else if (isBefore(today, cDate)) {
      exhibitStatus = statuses.current
      secondaryStatus = `Closes ${format(cDate, "PPPP")}`
    } else if (isAfter(today, cDate)) {
      exhibitStatus = statuses.past
      secondaryStatus = `Ran from ${format(oDate, "P")} to ${format(
        cDate,
        "P"
      )}`
    }
  }

  return (
    <Layout>
      <SEO
        title={(title && title.en) || "Untitled"}
        description={
          _rawOverview && _rawOverview.en && toPlainText(_rawOverview.en)
        }
        // TODO what if banner.asset is null?
        image={banner}
      />
      <article>
        <Banner figure={banner} />
        <TitleSection
          title={title && title.en}
          subtitle={subtitle && subtitle.en}
          beforeText={exhibitStatus}
          after={
            <>
              {secondaryStatus && <p>{secondaryStatus}</p>}
              {_rawGallery && _rawGallery.name && _rawGallery.name.en && (
                <p className={styles.halfTopMargin}>
                  {_rawGallery.slug ? (
                    <Link to={`/galleries/${_rawGallery.slug.current}/`}>
                      {_rawGallery.name.en}
                    </Link>
                  ) : (
                    _rawGallery.name.en
                  )}
                </p>
              )}
              <div className={styles.titleButtonContainer}>
                <ButtonStyledA
                  href={ticketPurchaseLink}
                  newtab={true}
                  text={"Buy Tickets"}
                />
                {/* TODO update this with actual plan a visit link */}
                <ButtonStyledLink to={"/visit/"} text={"Plan a Visit"} />
                {/* <ButtonStyledLink to={"/exhibits/"} text={"All Exhibits"} /> */}
                {/* <Button text={"I'm a Button!"} /> */}
              </div>
            </>
          }
        />
        <ContainerWithToc
          sidebarContent={
            <aside>
              <nav>
                <ul>
                  <li>All Exhibits</li>
                  <ul>
                    <li>Other exhibit</li>
                    {[...Array(40).keys()].map(x => (
                      <li key={x}>Another exhibit</li>
                    ))}
                  </ul>
                </ul>
              </nav>
            </aside>
          }
          sections={[
            <TocSection id="overview" key="overview" headingText={"Overview"}>
              {_rawOverview && _rawOverview.en && (
                <PortableText
                  className={styles.article}
                  blocks={_rawOverview.en}
                />
              )}
            </TocSection>,
            <TocSection id="images" key="images" headingText="Images">
              {imageGallery && imageGallery.length > 0 && (
                <ImageGallery imageGallery={imageGallery} />
              )}
            </TocSection>,
            <TocSection
              id="featured-artists"
              key="featured-artists"
              headingText="Featured Artists"
            >
              <div className={styles.artistGrid}>
                {featuredArtists &&
                  featuredArtists.map(
                    ({
                      name,
                      biography,
                      slug,
                      instagram,
                      website,
                      profilePicture,
                    }) => {
                      const nameAndPic = (
                        <>
                          {name && <h3 className="h4">{name.en}</h3>}
                          {profilePicture && (
                            <Figure
                              figure={profilePicture}
                              dimensions={1 / 1}
                              width={200}
                              displayCaption={false}
                              // className={styles.banner}
                            />
                          )}
                        </>
                      )
                      return (
                        <div className={styles.artistCard} key={name.en}>
                          {slug ? (
                            <Link to={`/artists/${slug.current}`}>
                              {nameAndPic}
                            </Link>
                          ) : (
                            nameAndPic
                          )}
                          {biography && (
                            <ExcerptWithLink
                              excerpt={biography.en}
                              excerptLength={200}
                              linkText={`Read more on ${name.en}'s page`}
                              to={slug && `/artists/${slug.current}`}
                            />
                          )}
                          {website && (
                            <p>
                              <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >{`${name.en}'s website`}</a>
                            </p>
                          )}
                          {instagram && (
                            <p>
                              <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                              >{`${name.en}'s Instagram`}</a>
                            </p>
                          )}
                        </div>
                      )
                    }
                  )}
              </div>
            </TocSection>,
            <TocSection
              id="curation-process"
              key="curation-process"
              headingText="Curation Process"
            >
              {/* TODO update links to cac process and youth programs */}
              {curatedBy && curatedBy._type === "youthProgramSession" && (
                <p>
                  This exhibit was curated by{" "}
                  <Link
                    to={`/youth-program-sessions/${
                      curatedBy.slug ? curatedBy.slug.current : ""
                    }`}
                  >
                    {curatedBy.name && curatedBy.name.en}
                  </Link>
                  {curatedBy.type && (
                    <>
                      , a session of the{" "}
                      <Link
                        to={`/youth-programs/${
                          curatedBy.type.slug ? curatedBy.type.slug.current : ""
                        }`}
                      >
                        {curatedBy.type.name && curatedBy.type.name.en} youth
                        program
                      </Link>
                    </>
                  )}
                  .
                </p>
              )}
              {curatedBy && curatedBy._type === "cacProcess" && (
                <p>
                  This exhibit was curated through the{" "}
                  <Link to="/cac-process">
                    Community Advisory Committee (CAC) Process
                  </Link>
                  . Through the stories of our community, The Wing is able to
                  create and develop exhibits with authentic voices from real
                  people.
                </p>
              )}
              <p>
                Learn more about how exhibits are curated at Wing Luke Museum by
                reading more about the{" "}
                <Link to="/cac-process/">
                  Community Advisory Committee Process
                </Link>{" "}
                and Wing Luke Museum's{" "}
                <Link to="/youth-programs/">Youth Programs.</Link>
              </p>
            </TocSection>,
            <TocSection id="thanks" key="thanks" headingText="Thanks">
              <p>thanks to: THE WING DONORS (link to individual giving page)</p>
            </TocSection>,
          ]}
        ></ContainerWithToc>
      </article>
    </Layout>
  )
}

export default ExhibitTemplate

export const query = graphql`
  query ExhibitTemplateQuery($id: String!) {
    exhibit: sanityExhibit(id: { eq: $id }) {
      id
      banner {
        ...SanityImage
      }
      title {
        en
      }
      subtitle {
        en
      }
      slug {
        current
      }
      openingDate
      closingDate
      _rawOverview
      imageGallery {
        ...SanityImage
      }
      _rawGallery(resolveReferences: { maxDepth: 2 })
      featuredArtists {
        name {
          en
        }
        slug {
          current
        }
        biography {
          en
        }
        profilePicture {
          ...SanityImage
        }
        instagram
        website
      }
      curatedBy {
        ... on SanityYouthProgramSession {
          name {
            en
          }
          slug {
            current
          }
          _type
          type {
            slug {
              current
            }
            name {
              en
            }
          }
        }
        ... on SanityCacProcess {
          _type
        }
      }
    }
    sanityVisitorGuide {
      ticketPurchaseLink
    }
  }
`

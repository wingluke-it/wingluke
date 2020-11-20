import React from "react"
import { graphql, Link } from "gatsby"
import { toPlainText } from "../lib/helpers"
import { useExhibits } from "../hooks/useExhibits"
import { useTicketPurchaseLink } from "../hooks/useTicketPurchaseLink"
import { isAfter, isBefore, parse, isSameDay, format } from "date-fns"
import classNames from "classnames"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ContainerWithToc from "../components/containers/containerWithToc"
import TocSection from "../components/containers/tocSection"

import ButtonStyledA from "../components/base_elements/buttonStyledA"
import ButtonStyledLink from "../components/base_elements/buttonStyledLink"
import Banner from "../components/banner"
import ExcerptWithLink from "../components/excerptWithLink"
import Figure from "../components/figure"
import ImageGallery from "../components/imageGallery"
import PortableText from "../components/portableText"
import TitleSection from "../components/titleSection"
import NavList from "../components/navList"

import styles from "./exhibit.module.scss"
import navListStyles from "../components/navList.module.scss"

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
  const exhibitEdges = useExhibits()
  const ticketPurchaseLink = useTicketPurchaseLink()

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
        image={banner}
      />
      <article>
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
                      {`${_rawGallery.name.en}${
                        _rawGallery.floor && ` (Floor ${_rawGallery.floor})`
                      }`}
                    </Link>
                  ) : (
                    `${_rawGallery.name.en}${
                      _rawGallery.floor && ` (Floor ${_rawGallery.floor})`
                    }`
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
        <Banner figure={banner} />
        <ContainerWithToc
          sidebarContentRight={
            // TODO refactor this into a reusable sidebarNav component
            // TODO factor out useExhibits hook into a custom, reusable hook https://www.gatsbyjs.com/docs/use-static-query/#composing-custom-usestaticquery-hooks
            <aside>
              <NavList
                listItems={[
                  <h2
                    key="all-exhibits"
                    className={classNames("h4", navListStyles.header)}
                  >
                    <Link to={"/exhibits/"}>All Exhibits</Link>
                  </h2>,
                  exhibitEdges.map(({ node }, index) => (
                    // TODO filter out past exhibits
                    // TODO categorize by current and upcoming
                    // TODO alphabetize? include opening/closing dates?
                    <li key={`other-exhibit-${index}`}>
                      <Link
                        activeClassName={navListStyles.activeLink}
                        to={`/exhibits/${node.slug && node.slug.current}`}
                      >
                        {node.title && node.title.en}
                      </Link>
                    </li>
                  )),
                ]}
              />
              {/* <nav>
                <h2 className={classNames("h4", styles.sidebarHeader)}>
                  <Link to="/exhibits/">All Exhibits</Link>
                </h2>
                <ul className={styles.sidebarList}>
                  {exhibitEdges.map(({ node }, index) => (
                    // TODO filter out past exhibits
                    // TODO categorize by current and upcoming
                    // TODO alphabetize? include opening/closing dates?
                    <li key={`other-exhibit-${index}`}>
                      <Link
                        activeClassName={styles.activeExhibitLink}
                        to={`/exhibits/${node.slug && node.slug.current}`}
                      >
                        {node.title && node.title.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav> */}
            </aside>
          }
          sections={[
            _rawOverview && _rawOverview.en && (
              <TocSection id="overview" key="overview" headingText={"Overview"}>
                <PortableText
                  className={styles.article}
                  blocks={_rawOverview.en}
                />
              </TocSection>
            ),
            imageGallery && imageGallery.length > 0 && (
              <TocSection id="images" key="images" headingText="Images">
                <ImageGallery imageGallery={imageGallery} />
              </TocSection>
            ),
            featuredArtists && featuredArtists.length > 0 && (
              <TocSection
                id="featured-artists"
                key="featured-artists"
                headingText="Featured Artists"
              >
                <div className={styles.artistGrid}>
                  {featuredArtists.map(
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
                          {/* {website && (
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
                          )} */}
                        </div>
                      )
                    }
                  )}
                </div>
              </TocSection>
            ),
            curatedBy && (
              <TocSection
                id="curation-process"
                key="curation-process"
                headingText="Curation Process"
              >
                {/* TODO update links to cac process and youth programs */}
                {/* TODO include list of CAC participant or youth participant names */}
                {curatedBy._type === "youthProgramSession" && (
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
                            curatedBy.type.slug
                              ? curatedBy.type.slug.current
                              : ""
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
                {curatedBy._type === "cacProcess" && (
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
                  Learn more about how exhibits are curated at Wing Luke Museum
                  by reading more about the{" "}
                  <Link to="/cac-process/">
                    Community Advisory Committee Process
                  </Link>{" "}
                  and Wing Luke Museum's{" "}
                  <Link to="/youth-programs/">Youth Programs.</Link>
                </p>
              </TocSection>
            ),
            <TocSection id="thanks" key="thanks" headingText="Thanks">
              <p>thanks to: THE WING DONORS (link to individual giving page)</p>
              <p>
                Phasellus viverra nulla ut metus varius laoreet. Curabitur
                turpis. Pellentesque habitant morbi tristique senectus et netus
                et malesuada fames ac turpis egestas. Phasellus ullamcorper
                ipsum rutrum nunc. Integer tincidunt. Quisque ut nisi. Donec mi
                odio, faucibus at, scelerisque quis, convallis in, nisi. Vivamus
                euismod mauris. Fusce pharetra convallis urna. Sed aliquam
                ultrices mauris. Nulla porta dolor. Etiam rhoncus.Fusce egestas
                elit eget lorem. Nulla sit amet est. Ut id nisl quis enim
                dignissim sagittis. Donec sodales sagittis magna. Ut id nisl
                quis enim dignissim sagittis. Nam at tortor in tellus interdum
                sagittis. Duis arcu tortor, suscipit eget, imperdiet nec,
                imperdiet iaculis, ipsum. Nulla neque dolor, sagittis eget,
                iaculis quis, molestie non, velit. Mauris turpis nunc, blandit
                et, volutpat molestie, porta ut, ligula. Quisque id odio. Nam
                quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                Donec id justo. Phasellus ullamcorper ipsum rutrum nunc.
                Suspendisse potenti. Vivamus laoreet. Nam eget dui. Praesent nec
                nisl a purus blandit viverra. Praesent congue erat at massa.
                Nulla neque dolor, sagittis eget, iaculis quis, molestie non,
                velit. Donec pede justo, fringilla vel, aliquet nec, vulputate
                eget, arcu. Curabitur ligula sapien, tincidunt non, euismod
                vitae, posuere imperdiet, leo. In turpis. Vestibulum rutrum, mi
                nec elementum vehicula, eros quam gravida nisl, id fringilla
                neque ante vel mi. In consectetuer turpis ut velit. Pellentesque
                egestas, neque sit amet convallis pulvinar, justo nulla eleifend
                augue, ac auctor orci leo non est.
              </p>
            </TocSection>,
          ].filter(Boolean)} // .filter(Boolean) is necessary to filter out null values
        ></ContainerWithToc>
      </article>
    </Layout>
  )
}

export default ExhibitTemplate

export const query = graphql`
  query ExhibitTemplateQuery($id: String!) {
    exhibit: sanityExhibit(id: { eq: $id }) {
      banner {
        ...SanityImage
      }
      title {
        en
      }
      subtitle {
        en
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
  }
`

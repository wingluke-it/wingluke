import React from "react"
import { graphql, Link } from "gatsby"
import { toPlainText, getExhibitStatus } from "../lib/helpers"
import { useExhibits } from "../hooks/useExhibits"
import { useTicketPurchaseLink } from "../hooks/useTicketPurchaseLink"

import Layout from "../components/layout"
import SEO from "../components/seo"

import TocLayout from "../components/layouts/tocLayout"
import DocsLayout from "../components/layouts/docsLayout"

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
    specialCategories,
    featuredArtists,
    curatedBy,
  } = props.data && props.data.exhibit
  const exhibitEdges = useExhibits()
  const ticketPurchaseLink = useTicketPurchaseLink()
  const [exhibitStatus, secondaryStatus] = getExhibitStatus(
    openingDate,
    closingDate,
    specialCategories
  )
  const sectionTitlesAndContent = {}
  if (_rawOverview && _rawOverview.en) {
    sectionTitlesAndContent["Overview"] = (
      <PortableText className={styles.article} blocks={_rawOverview.en} />
    )
  }
  if (imageGallery && imageGallery.length > 0) {
    sectionTitlesAndContent["Look For"] = (
      <ImageGallery imageGallery={imageGallery} />
    )
  }
  if (featuredArtists && featuredArtists.length > 0) {
    sectionTitlesAndContent["Featured Artists"] = (
      <div className={styles.artistGrid}>
        {featuredArtists.map(
          ({ name, biography, slug, instagram, website, profilePicture }) => {
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
                  <Link to={`/artists/${slug.current}`}>{nameAndPic}</Link>
                ) : (
                  nameAndPic
                )}
                {biography && (
                  <ExcerptWithLink
                    className={styles.excerpt}
                    excerpt={biography.en}
                    excerptLength={100}
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
    )
  }
  if (curatedBy) {
    sectionTitlesAndContent["Curation Process"] = (
      <>
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
                    curatedBy.type.slug ? curatedBy.type.slug.current : ""
                  }`}
                >
                  {curatedBy.type.name && curatedBy.type.name.en} youth program
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
            . Through the stories of our community, The Wing is able to create
            and develop exhibits with authentic voices from real people.
          </p>
        )}
        <p>
          Learn more about how exhibits are curated at Wing Luke Museum by
          reading more about the{" "}
          <Link to="/cac-process/">Community Advisory Committee Process</Link>{" "}
          and Wing Luke Museum's{" "}
          <Link to="/youth-programs/">Youth Programs.</Link>
        </p>
      </>
    )
  }
  sectionTitlesAndContent["Thanks"] = (
    <>
      <p>thanks to: THE WING DONORS (link to individual giving page)</p>
    </>
  )

  const exEdgesAlphabetizeComparator = ({ node: aNode }, { node: bNode }) => {
    if (!aNode.title || !aNode.title.en || !bNode.title || !bNode.title.en) {
      return 0
    } else {
      return aNode.title.en.localeCompare(bNode.title.en, "en", {
        ignorePunctuation: true,
      })
    }
  }
  const exEdgesFilterFunc = status => ({ node: exhibit }) =>
    getExhibitStatus(
      exhibit.openingDate,
      exhibit.closingDate,
      exhibit.specialCategories
    )[0] === status
  const mapExEdgeToLi = ({ node }, index) => (
    // TODO filter out past exhibits
    // TODO categorize by current and upcoming
    // TODO alphabetize? include opening/closing dates?
    <li key={`other-exhibit-${index}`}>
      <Link
        activeClassName={navListStyles.activeLink}
        partiallyActive={true}
        to={`/exhibits/${node.slug && node.slug.current}`}
      >
        {node.title && node.title.en}
      </Link>
    </li>
  )
  const getNavSection = status => [
    <h2 key={`${status}-exhibits`} className={"h4"}>
      <Link to={`/exhibits/#${status.replace(/\W/g, "-").toLowerCase()}`}>
        {status}
      </Link>
    </h2>,
    exhibitEdges
      .filter(exEdgesFilterFunc(status))
      .sort(exEdgesAlphabetizeComparator)
      .map(mapExEdgeToLi),
  ]

  const navList = (
    <NavList
      listItems={[
        <h2 key="all-exhibits" className={"h4"}>
          <Link to={"/exhibits/"}>All Exhibits</Link>
        </h2>,
        ...getNavSection("Now on View"),
        ...getNavSection("Always on View"),
        ...getNavSection("Upcoming"),
        ...getNavSection("Past"),
        ...getNavSection("Traveling (For Rent)"),
      ]}
    />
  )

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
          beforeText={`EXHIBIT | ${exhibitStatus}`}
          after={
            <>
              {secondaryStatus && (
                <p className={styles.halfTopMargin}>{secondaryStatus}</p>
              )}
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
        <DocsLayout
          main={
            <TocLayout
              tocTitle={""}
              sectionTitlesAndContent={sectionTitlesAndContent}
              afterToc={<aside>{navList}</aside>}
            />
          }
          sidebar={
            null
            // TODO refactor this into a reusable sidebarNav component
          }
        />
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
      specialCategories
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

// import { Link } from "gatsby"
import React, { useRef } from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styles from "./index.module.scss"
import PlayPauseButton from "../components/playPauseButton"
import { buildImageObj } from "../lib/helpers"
import { imageUrlFor } from "../lib/image-url"
import { useMediaQuery } from "react-responsive"
import { HiOutlineArrowCircleDown } from "@react-icons/all-files/hi/HiOutlineArrowCircleDown"
import PortableText from "../components/portableText"
// import { AnchorLink } from "gatsby-plugin-anchor-links"
// import smoothscroll from "smoothscroll-polyfill"

// import { mapEdgesToNodes } from "../lib/helpers"

const IndexPage = ({ data: { sanityHomepage } }) => {
  /* useEffect(() => {
    smoothscroll.polyfill()
  }, []) */

  // const exhibitNodes = mapEdgesToNodes(props.data.allSanityExhibit)
  // const use360 = useMediaQuery({ maxHeight: 360 })
  const use480 = useMediaQuery({ minHeight: 361, maxHeight: 480 })
  const use720 = useMediaQuery({ minHeight: 481, maxHeight: 720 })
  const use1080 = useMediaQuery({ minHeight: 721, maxHeight: 1080 })
  let bgVidUrl = sanityHomepage?.backgroundVideo360?.asset?.url
  let posterHeight = 360
  if (use480) {
    bgVidUrl = sanityHomepage?.backgroundVideo480?.asset?.url
    posterHeight = 480
  } else if (use720) {
    bgVidUrl = sanityHomepage?.backgroundVideo720?.asset?.url
    posterHeight = 720
  } else if (use1080) {
    bgVidUrl = sanityHomepage?.backgroundVideo1080?.asset?.url
    posterHeight = 1080
  }
  const posterUrl =
    sanityHomepage?.poster?.asset &&
    imageUrlFor(buildImageObj(sanityHomepage.poster))
      .height(posterHeight)
      .width(Math.round((posterHeight * 16) / 9))
      .fit("crop")
      .auto("format")
      .url()

  const scrollDown = () => {
    const mainRefY =
      mainRef.current.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top
    let headerBottomBarHeight = getComputedStyle(
      mainRef.current
    ).getPropertyValue("--header-bottom-bar-height")
    headerBottomBarHeight = headerBottomBarHeight.substring(
      0,
      headerBottomBarHeight.length - 3
    )
    headerBottomBarHeight =
      parseFloat(headerBottomBarHeight) *
      parseFloat(getComputedStyle(document.documentElement).fontSize)
    // smoothscroll.polyfill()
    window.scrollTo({
      top: mainRefY - headerBottomBarHeight,
      left: 0,
      behavior: "smooth",
    })
  }

  const bgVid = useRef(null)
  const mainRef = useRef(null)
  return (
    <>
      <SEO
        title="Home"
        description="The Official Website of the Wing Luke Museum of the Asian Pacific American Experience"
        // TODO what if banner.asset is null?
        image={sanityHomepage?.poster} // TODO update this
      />
      {bgVidUrl && (
        <header className={styles.videoHeader}>
          <video
            ref={bgVid}
            className={styles.bgVid}
            playsInline
            autoPlay
            muted
            loop
            poster={posterUrl}
            style={{
              background: `url(${posterUrl}) no-repeat`,
            }}
          >
            {/* <source src="homeloopWebm" type="video/webm" /> */}
            <source src={bgVidUrl} type="video/mp4" />
          </video>
          <div className={styles.overlay}></div>
          <div className={styles.titleSection}>
            <h1>
              <span>Explore</span>
              Wing Luke Museum
            </h1>
            <button onClick={scrollDown}>
              <HiOutlineArrowCircleDown />
            </button>
            {/* <AnchorLink to={"/#main-content"}>
              <HiOutlineArrowCircleDown />
            </AnchorLink> */}
          </div>
          {bgVid && (
            <div className={styles.vidControls}>
              <PlayPauseButton bgVid={bgVid} />
            </div>
          )}
        </header>
      )}
      <div className={styles.main} ref={mainRef} id={"main-content"}>
        {sanityHomepage?._rawMainContent?.en && (
          <PortableText blocks={sanityHomepage._rawMainContent.en} />
        )}
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    sanityHomepage {
      backgroundVideo360 {
        asset {
          url
        }
      }
      backgroundVideo480 {
        asset {
          url
        }
      }
      backgroundVideo720 {
        asset {
          url
        }
      }
      backgroundVideo1080 {
        asset {
          url
        }
      }
      poster {
        ...SanityImage
      }
      _rawMainContent
    }
  }
`

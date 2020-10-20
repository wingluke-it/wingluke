// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const dataset = process.env.NODE_ENV || "development"
console.log(`Sanity dataset used: ${dataset}`)

const isProd = process.env.NODE_ENV === "production"
const sanityToken = process.env.SANITY_TOKEN || ""
console.log(`Sanity token used: ${sanityToken}`)

module.exports = {
  siteMetadata: {
    title: `Wing Luke Museum of the Asian Pacific American Experience`,
    description: `The official website of the Wing Luke Museum of the Asian Pacific American Experience`,
    author: `Wing Luke Museum of the Asian Pacific American Experience`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // node-sass, the default implementation, is considered deprecated. It doesn't allow for use of @use at-rules.
        implementation: require("sass"),
      },
    },
    `gatsby-plugin-postcss`, // TODO add CSSnext plugin https://www.gatsbyjs.com/docs/post-css/
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `1jr4bwbd`,
        dataset: dataset,
        // a token with read permissions is required
        // if you have a private dataset
        token: sanityToken,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wing Luke Museum of the Asian Pacific American Experience`,
        short_name: `Wing Luke Museum`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#7c2128`, // `#c20000`,
        display: `minimal-ui`,
        icon: `src/images/wingluke-icon2.png`, // This path is relative to the root of the site.
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}

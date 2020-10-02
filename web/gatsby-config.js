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
        background_color: `#ffffff`,
        theme_color: `#c20000`,
        display: `minimal-ui`,
        icon: `src/images/wingluke-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}

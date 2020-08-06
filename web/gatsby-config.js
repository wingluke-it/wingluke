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
    title: `Wing Luke Museum`,
    description: `This is the description for the wingluke.org rebuild's second prototype`,
    author: `Dan Glauber`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

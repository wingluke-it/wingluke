import { useStaticQuery, graphql } from "gatsby"

export const useExhibits = () => {
  const { allSanityExhibit } = useStaticQuery(
    graphql`
      query AllExhibits {
        allSanityExhibit {
          edges {
            node {
              title {
                en
              }
              slug {
                current
              }
            }
          }
        }
      }
    `
  )
  return allSanityExhibit.edges || {}
}

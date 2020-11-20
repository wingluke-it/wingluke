import { useStaticQuery, graphql } from "gatsby"

export const useEvents = () => {
  const { allSanityEvent } = useStaticQuery(
    graphql`
      query AllEvents {
        allSanityEvent {
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
  return allSanityEvent.edges || {}
}

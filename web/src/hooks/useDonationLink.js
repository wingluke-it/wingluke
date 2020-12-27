import { graphql, useStaticQuery } from "gatsby"

export const useDonationLink = () => {
  const { sanityDonorProgram } = useStaticQuery(
    graphql`
      {
        sanityDonorProgram {
          donationLink
        }
      }
    `
  )

  return sanityDonorProgram.donationLink
}

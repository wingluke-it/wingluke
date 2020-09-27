export default {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "figure",
    },
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this sponsor organization.",
    },
    {
      name: "isSponsor",
      title: "Organization is no longer is a Sponsor of The Wing",
      type: "boolean",
    },
    {
      name: "donationAmount",
      title: "Amount Donated",
      type: "number",
      validation: (Rule) => Rule.positive().precision(2),
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "bio.en",
      media: "logo",
    },
  },
};

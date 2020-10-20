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
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this sponsor organization (optional).",
    },
    {
      name: "logo",
      title: "Logo",
      type: "figure",
    },
    {
      name: "website",
      title: "Website",
      type: "url",
      description: "Please provide the link to this sponsor's homepage.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsorCategory" }] }],
      description:
        "If this sponsor belongs to a special category, please reference it here.",
    },
    {
      name: "donationAmount",
      title: "Amount Donated",
      type: "string",
      options: {
        list: [
          "Up to $999",
          "$1,000 to $2,499",
          "$2,500 to $4,999",
          "$5,000 to $9,999",
          "$10,000 to $14,999",
          "$15,000 to $24,999",
          "$25,000 to $49,999",
          "$50,000 to $99,999",
          "$100,000 and Above",
        ],
        layout: "radio",
      },
    },
    {
      name: "isFormerSponsor",
      title: "Organization is no longer is a Sponsor of The Wing",
      type: "boolean",
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

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
      name: "tier",
      title: "Tier",
      description:
        "This will determine how this sponsor is categorized on the main sponsors page.",
      type: "string",
      options: {
        list: [
          "Presenting Season",
          "Season",
          "Lead",
          "Prime",
          "Major",
          "Supporting ",
          "Partner",
          "Friend",
          "Media",
        ],
        layout: "radio",
      },
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
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this sponsor organization (optional).",
    },
    {
      name: "isFormerSponsor",
      title: "Organization is no longer is a Sponsor of The Wing",
      description:
        "Because past exhibits may reference former sponsors, for historical pursposes, it is better to turn on this toggle than it is to delete former sponsors.",
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

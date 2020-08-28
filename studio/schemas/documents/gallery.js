export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
      description:
        "Please provide a short (3 to 5 sentence) description of this gallery.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this gallery.",
    },
    {
      name: "exhibits",
      title: "Exhibits Shown",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
      description:
        "Please provide all exhibits (past, present, and future) that have been shown in this gallery.",
    },
    // TODO should this be broken down into three separate exhibits fields (pastExhibits, currentExhibit, futureExhibits)?
    // currently I'm assuming the current exhibit can be inferred by its opening and closing dates, but what if those aren't present?
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
    },
  },
};

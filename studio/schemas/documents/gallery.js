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
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this gallery's web page. Use the 'Generate' button to set it to a unique ID based on the Name field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "floor",
      type: "number",
      title: "Floor",
      validation: (Rule) => Rule.positive().integer(),
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
    /*     this can be inferred from the gallery field of the exhibit document
{
      name: "exhibits",
      title: "Exhibits Shown",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
      description:
        "Please provide all exhibits (past, present, and future) that have been shown in this gallery.",
    }, */
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
    },
  },
};

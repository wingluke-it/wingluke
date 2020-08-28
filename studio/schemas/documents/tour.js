export default {
  name: "tour",
  title: "Tour",
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
      type: "localePortableText",
      description:
        "Please provide a short (3-5 sentence) description of this tour.",
      // TODO required?
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this tour.",
    },
    {
      name: "educationGuides",
      title: "Tour/Education Guides",
      type: "array",
      of: [{ type: "reference", to: [{ type: "individual" }] }],
    },
    {
      name: "schedulingInfo",
      title: "Scheduling",
      type: "schedulingInfo",
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
      media: "banner",
    },
  },
};

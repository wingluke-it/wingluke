export default {
  name: "sponsorCategory",
  title: "Sponsor Category",
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
        "Give a short (3 to 5 sentence) description of this category of sponsors.",
    },
    {
      name: "image",
      title: "Image",
      type: "figure",
      description:
        "Please provide an image to represent this category of sponsors.",
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
    },
  },
};

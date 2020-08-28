export default {
  name: "artifact",
  title: "Artifact",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};

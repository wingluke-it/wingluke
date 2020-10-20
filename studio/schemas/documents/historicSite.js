export default {
  name: "historicSite",
  title: "Historic Site",
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

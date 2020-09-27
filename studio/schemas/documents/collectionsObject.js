export default {
  name: "collectionsObject",
  title: "Collections Object",
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

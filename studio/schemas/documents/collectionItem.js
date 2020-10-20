export default {
  name: "collectionItem",
  title: "Collection Item",
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

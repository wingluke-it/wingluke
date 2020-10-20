export default {
  name: "collection",
  type: "document",
  title: "Collection",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "collectionItem" }, { type: "oralHistory" }],
        },
        /*         {
          name: "Oral History",
          type: "reference",
          to: [{ type: "oralHistory" }],
        },
        {
          name: "Collection Item",
          type: "reference",
          to: [{ type: "collectionItem" }],
        }, */
      ],
    },
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
};

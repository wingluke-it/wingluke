export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};

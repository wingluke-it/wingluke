export default {
  name: "educatorWorkshop",
  title: "Educator Workshop",
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

export default {
  name: "department",
  title: "Department",
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

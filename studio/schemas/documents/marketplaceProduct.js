export default {
  name: "marketplaceProduct",
  title: "Marketplace Product",
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

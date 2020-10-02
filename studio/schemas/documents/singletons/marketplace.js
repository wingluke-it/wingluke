const MARKETPLACE_TITLE = "Marketplace";

export default {
  name: "marketplace",
  title: MARKETPLACE_TITLE,
  type: "document",
  fields: [
    {
      name: "catalog",
      title: "Catalog",
      type: "file",
      description:
        "Please upload the current PDF catalog for the brick and mortar marketplace.",
      options: {
        accept: ".pdf",
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: MARKETPLACE_TITLE,
      };
    },
  },
};

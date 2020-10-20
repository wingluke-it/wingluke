const CAC_PROCESS_TITLE = "CAC Process";

export default {
  name: "cacProcess",
  title: CAC_PROCESS_TITLE,
  type: "document",
  fields: [
    {
      name: "overview",
      title: "Overview",
      type: "localeText", // TODO should be portableText?
      validation: (Rule) => Rule.required(),
      description:
        "Please provide a brief (3-5 sentence) overview of the CAC Process",
    },
    {
      name: "principles",
      title: "Top 10 Principles for Community-Based Work",
      type: "array",
      of: [{ type: "localeString" }],
    },
    // TODO Our Values - should this go here or in museumMeta?
  ],
  preview: {
    prepare() {
      return {
        title: CAC_PROCESS_TITLE,
      };
    },
  },
};

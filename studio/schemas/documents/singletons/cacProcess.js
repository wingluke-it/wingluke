const CAC_PROCESS_TITLE = "CAC Process";

export default {
  name: "cacProcess",
  title: CAC_PROCESS_TITLE,
  type: "document",
  fields: [
    {
      name: "description",
      title: "Description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: CAC_PROCESS_TITLE,
      };
    },
  },
};

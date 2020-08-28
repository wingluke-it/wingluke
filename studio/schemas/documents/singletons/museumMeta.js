const MUSEUM_META_TITLE = "Museum Mission and Processes";

export default {
  name: "museumMeta",
  title: MUSEUM_META_TITLE,
  type: "document",
  fields: [
    {
      name: "mission",
      title: "Wing Luke Museum Mission",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cacProcess",
      title: "CAC (Community Advisory Committee) Process",
      description: "Give an explanation of the CAC Process.",
      type: "localePortableText",
    },
  ],
  preview: {
    prepare() {
      return {
        title: MUSEUM_META_TITLE,
      };
    },
  },
};

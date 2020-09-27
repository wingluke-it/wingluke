const MUSEUM_META_TITLE = "Mission, Goals, and Values";

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
  ],
  preview: {
    prepare() {
      return {
        title: MUSEUM_META_TITLE,
      };
    },
  },
};

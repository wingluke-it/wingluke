export default {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default {
  // TODO should this be renamed to resourceSpace? This is what this is referred to on our visitors' guide map
  // another name that might make sense is museum space
  name: "eventSpace",
  title: "Event Space",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};

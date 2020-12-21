export default {
  name: "membershipBenefit",
  title: "Benefit",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      description:
        "(Optional) Give a short description if the title of this benefit doesn't sufficiently explain its details.",
      type: "localeString",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
    /* {
      name: "isHighlightedBenefit",
    } */
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
      media: "banner",
    },
  },
};

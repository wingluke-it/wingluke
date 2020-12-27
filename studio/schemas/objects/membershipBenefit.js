export default {
  name: "membershipBenefit",
  title: "Benefit",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      description:
        "(Optional) Give a short description if the title of this benefit doesn't sufficiently explain its details.",
      type: "localeString",
    },
    {
      name: "footnotes",
      title: "Footnotes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "horizontal",
        list: [
          {
            value:
              "Member must be present at time of visit. Not valid for private group tours. Memberships are non-transferable.",
            title:
              "Member must be present at time of visit. Not valid for private group tours. Memberships are non-transferable.",
          },
          {
            value: "Available while supplies last and subject to change.",
            title: "Available while supplies last and subject to change.",
          },
        ],
      },
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
      footnotes: "footnotes",
    },
    prepare: ({ title, footnotes = [], subtitle, media }) => {
      let titleString = title;
      if (
        footnotes.includes(
          "Member must be present at time of visit. Not valid for private group tours. Memberships are non-transferable."
        )
      ) {
        titleString += "* ";
      }
      if (
        footnotes.includes(
          "Available while supplies last and subject to change."
        )
      ) {
        titleString += "** ";
      }
      return {
        title: titleString,
        subtitle: subtitle,
        media: media,
      };
    },
  },
};

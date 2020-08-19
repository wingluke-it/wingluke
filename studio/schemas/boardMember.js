export default {
  name: "boardMember",
  title: "Board Member",
  type: "document",
  fields: [
    {
      name: "person",
      title: "Person",
      type: "reference",
      description:
        "True if the staff member is in the building, false otherwise.",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "person.name",
      media: "person.profilePicture",
    },
  },
};

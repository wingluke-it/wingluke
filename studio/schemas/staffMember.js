export default {
  name: "staffMember",
  title: "Staff Member",
  type: "document",
  fields: [
    {
      name: "person",
      title: "Person",
      description:
        "You may create a new person either by clicking the '+' symbol in the top tool bar or by adding a new person in the Constituents/People => All People section.",
      type: "reference",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "position",
      title: "Position/Title",
      type: "localeString",
    },
    {
      name: "departments",
      title: "Departments",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "department" }],
        },
      ],
    },
    {
      name: "isInBuilding",
      title: "In building",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "True if the staff member is in the building, false otherwise.",
    },
  ],
  preview: {
    select: {
      title: "person.name",
      media: "person.profilePicture",
    },
  },
};

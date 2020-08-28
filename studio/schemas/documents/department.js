export default {
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mission",
      title: "Department Mission",
      type: "localeText",
      description:
        "Please provide a short (3 to 5 sentence) description of this department's mission and goals at The Wing.",
    },
    // I think it's okay that this is redundant with the individual document type's department refence under staff member constituency details
    {
      name: "staffMembers",
      title: "Staff Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "individual" }] }],
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "mission.en",
    },
  },
};

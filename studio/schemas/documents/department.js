export default {
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
    // this relationship is represented in the staffMember document's departments field
    /*     {
      name: "staffMembers",
      title: "Staff Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "staffMember" }] }],
    }, */
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};

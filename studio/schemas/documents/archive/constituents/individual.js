import { EMAIL_FIELD, PHONE_FIELD } from "../../../schemaGlobals";

export default {
  name: "individual",
  title: "Individual",
  type: "document",
  fieldsets: [
    {
      name: "wingStaffDetails",
      title: "Wing Staff Constituency Details",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "boardMemberDetails",
      title: "Board Member Constituency Details",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pronunciation",
      title: "Name Pronunciation",
      type: "localeString",
      options: {
        collapsible: true,
        collapsed: true,
      },
      description:
        "You may use this guide to write a phonetic pronunciation of this individual's name: https://www.ling.upenn.edu/courses/Fall_2014/ling115/phonetics.html",
    },
    {
      name: "profilePicture",
      title: "Profile Picture",
      type: "figure",
    },
    EMAIL_FIELD,
    PHONE_FIELD,
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this individual.",
    } /* 
    {
      name: "constituencies",
      title: "Constituencies",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Please fill out the corresponding details of your selections below. E.g. if you check the 'Wing Staff' constituency, scroll down and fill out the fields under 'Wing Staff Constituency Details'.",
      options: {
        list: [
          { value: "boardMember", title: "Board Member" },
          { value: "donor", title: "Donor" },
          { value: "member", title: "Member" },
          { value: "wingStaff", title: "Wing Staff" },
          { value: "volunteer", title: "Volunteer" },
        ],
      },
    }, */,
    {
      name: "isWingStaff",
      title: "Individual is a Wing Staff Member",
      type: "boolean",
    },
    {
      name: "wingStaffPosition",
      title: "Position/Title",
      type: "localeString",
      fieldset: "wingStaffDetails",
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
      validation: (Rule) => Rule.unique(),
      fieldset: "wingStaffDetails",
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
      fieldset: "wingStaffDetails",
    },
    {
      name: "isBoardMember",
      title: "Individual is a Board Member",
      type: "boolean",
    },
    {
      name: "boardMemberPosition",
      title: "Position/Title",
      type: "localeString",
      fieldset: "boardMemberDetails",
    },
    {
      name: "isDonor",
      title: "Individual is a Donor",
      type: "boolean",
    },
    {
      name: "isVolunteer",
      title: "Individual is a Volunteer",
      type: "boolean",
    },
    {
      name: "isMember",
      title: "Individual is a Member",
      type: "boolean",
    },
  ],
  validation: (Rule) => [
    Rule.custom((fields) => {
      if (
        fields.isBoardMember &&
        (fields.boardMemberPosition === undefined ||
          !fields.boardMemberPosition.en)
      )
        return "The Board Member Constituency Details must be completely filled out because the 'Individual is a Board Member' toggle field is on.";
      return true;
    }),
    Rule.custom((fields) => {
      if (
        fields.constituencies &&
        fields.constituencies.includes("wingStaff") &&
        (fields.wingStaffPosition === undefined || !fields.wingStaffPosition.en)
      )
        return "The Wing Staff Constituency Details must be completely filled out because the 'Individual is a Wing Staff Member' toggle field is on.";
      return true;
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "bio.en",
      media: "profilePicture",
    },
  },
};

import {
  EMAIL_REGEX,
  PHONE_REGEX,
  referenceDescription,
} from "../schemaGlobals";

export default {
  name: "staffMember",
  title: "Staff Member",
  type: "document",
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
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this individual.",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email", // Error message is "Does not match email-pattern"
        }).error("Please provide a valid email address"),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
    },
    {
      name: "positions",
      title: "Position(s)/Title(s)",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "departments",
      title: "Department(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "department" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
      description:
        "Please provide a list of all departments this staff member works under. " +
        referenceDescription("department"),
    },
    {
      name: "dateJoined",
      title: "Date Joined",
      type: "date",
      description: "Please provide this staff member's start date.",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    /*     {
      name: "isInBuilding",
      title: "In building",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "True if the staff member is in the building, false otherwise.",
      fieldset: "wingStaffDetails",
    }, */
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "bio.en",
      media: "profilePicture",
    },
  },
};

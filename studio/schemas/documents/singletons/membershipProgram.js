import { EMAIL_REGEX, PHONE_REGEX } from "../../schemaGlobals";
const MEMBERSHIP_PROGRAM_TITLE = "Membership Program";

export default {
  name: "membershipProgram",
  title: MEMBERSHIP_PROGRAM_TITLE,
  type: "document",
  fields: [
    {
      name: "joinLink",
      title: "Join/Renew Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Please provide the link to the membership signup/renew page.",
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
    },
    {
      name: "phone",
      title: "Contact Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
    },
    {
      name: "membershipLevels",
      title: "Membership Levels",
      type: "array",
      of: [{ type: "membershipLevel" }],
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description: "Please provide an overview of the membership program.",
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about becoming a museum member.",
    },
    {
      name: "allMembers",
      title: "Member Panel",
      // TODO perhaps only community level members or members above a certain level get recognition
      description:
        "Please provide the names of all members. Ideally this will be kept up to date with only current members, but perhaps it is more feasible for this to be a list of all past and current members.",
      type: "array",
      // TODO perhaps add categories for membership levels? or join date?
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: MEMBERSHIP_PROGRAM_TITLE,
      };
    },
  },
};

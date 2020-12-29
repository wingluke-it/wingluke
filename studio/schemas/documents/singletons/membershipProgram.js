import { EMAIL_REGEX, PHONE_REGEX } from "../../schemaGlobals";

import { AiOutlineIdcard } from "react-icons/ai";

const MEMBERSHIP_PROGRAM_TITLE = "Membership Program Info";

export default {
  name: "membershipProgram",
  title: MEMBERSHIP_PROGRAM_TITLE,
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      description:
        "Provide a title to introduce The Wing's membership program.",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "localeString",
      description:
        "Provide a brief subtitle to introduce The Wing's membership program.",
    },
    {
      name: "intro",
      title: "Intro",
      type: "localeText",
      description:
        "Please provide a brief intro blurb for the membership program.",
    },
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
      name: "coreBenefits",
      title: "Core Membership Benefits",
      description:
        "Please provide all benefits that are common to ALL membership levels",
      type: "array",
      of: [{ type: "membershipBenefit" }],
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
        }).error("The required phone format is '123-456-7890 x123'"),
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
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
    {
      // this is just to get this to show up first in the desk structure ordering of this document and the membership levels
      // value should always be -1
      name: "yearlyPrice",
      title: "Price",
      type: "number",
      hidden: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: MEMBERSHIP_PROGRAM_TITLE,
        media: AiOutlineIdcard,
      };
    },
  },
};

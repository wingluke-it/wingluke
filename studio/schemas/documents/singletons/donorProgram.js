import { EMAIL_REGEX, PHONE_REGEX } from "../../schemaGlobals";
const DONOR_PROGRAM_TITLE = "Donor Program";

export default {
  name: "donorProgram",
  title: DONOR_PROGRAM_TITLE,
  type: "document",
  fields: [
    {
      name: "donationLink",
      title: "Donation Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Please provide the link to where donors can donate to the Wing.",
    },
    {
      name: "waysToGive",
      title: "Ways to Give",
      type: "array",
      of: [{ type: "wayToGive" }],
    },
    {
      name: "devEmail",
      title: "Development Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
      fieldset: "contactInfo",
    },
    {
      name: "devPhone",
      title: "Development Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
      fieldset: "contactInfo",
    },
    {
      name: "auctionEmail",
      title: "Auction Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
      fieldset: "contactInfo",
    },
    {
      name: "auctionPhone",
      title: "Auction Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
      fieldset: "contactInfo",
    },
    {
      name: "donationsEmail",
      title: "Donations Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
      fieldset: "contactInfo",
    },
    {
      name: "donationsPhone",
      title: "Donations Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
      fieldset: "contactInfo",
    },
    {
      name: "gsDescription",
      title: "Gallery Supporter Description",
      type: "localePortableText",
      description:
        "Please provide a brief (3-5 sentence) explanation of how to become a Gallery Supporter.",
    },
    {
      name: "gsBenefits",
      title: "Gallery Supporter Benefits",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "lcDescription",
      title: "Leadership Circle Description",
      type: "localePortableText",
      description:
        "Please provide a brief (3-5 sentence) explanation of how to join a Leadership Circle.",
    },
    {
      name: "lcBenefits",
      title: "Leadership Circle Benefits",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about donating to the museum.",
    },
  ],
  fieldsets: [
    {
      name: "contactInfo",
      title: "Contact Information",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: DONOR_PROGRAM_TITLE,
      };
    },
  },
};

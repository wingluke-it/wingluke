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
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about becoming a museum member.",
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

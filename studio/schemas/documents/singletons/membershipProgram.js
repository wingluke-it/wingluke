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
      description:
        "Please provide the link to the membership signup/renew page.",
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

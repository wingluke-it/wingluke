const JOIN_GUIDE_TITLE = "Join Guide";

export default {
  name: "joinGuide",
  title: JOIN_GUIDE_TITLE,
  type: "document",
  fields: [
    {
      name: "membershipSignupLink",
      title: "Membership Signup Link",
      type: "url",
    },
    // TODO see https://www.wingluke.org/join-give/ for more needed fields
  ],
  preview: {
    prepare() {
      return {
        title: JOIN_GUIDE_TITLE,
      };
    },
  },
};

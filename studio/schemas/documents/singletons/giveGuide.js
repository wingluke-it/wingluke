const GIVE_GUIDE_TITLE = "Give Guide";

export default {
  name: "giveGuide",
  title: GIVE_GUIDE_TITLE,
  type: "document",
  fields: [
    {
      name: "donationLink",
      title: "Donation Link",
      type: "url",
    },
    // TODO see https://www.wingluke.org/join-give/ for more needed fields
  ],
  preview: {
    prepare() {
      return {
        title: GIVE_GUIDE_TITLE,
      };
    },
  },
};

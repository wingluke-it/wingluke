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
      description:
        "Please provide the link to where donors can donate to The Wing.",
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

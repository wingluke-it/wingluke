const VOLUNTEER_PROGRAM_TITLE = "Volunteer Program";

export default {
  name: "volunteerProgram",
  title: VOLUNTEER_PROGRAM_TITLE,
  type: "document",
  fields: [
    {
      name: "applicationLink",
      title: "Application Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Please provide the link to the volunteer application survey.",
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about volunteering at the museum.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: VOLUNTEER_PROGRAM_TITLE,
      };
    },
  },
};

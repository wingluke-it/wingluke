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
      description:
        "Please provide the link to the volunteer application survey.",
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

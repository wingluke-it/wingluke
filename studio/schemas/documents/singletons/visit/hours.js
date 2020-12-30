const HOURS_TITLE = "Hours";

export default {
  name: "hours",
  title: HOURS_TITLE,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "localeString",
    },
    {
      // TODO add a list of days of the week field as well as two time fields?
      name: "hours",
      title: "Building Hours",
      type: "localeText",
      // rows: 3, // this only works with text fields (not localeText)
      description:
        "Please provide the hours the museum is open in a typical week (e.g. '10 AM - 5 PM, Tuesday - Sunday').",
    },
    {
      name: "daysClosed",
      title: "Days of the Year Closed",
      type: "array",
      of: [{ type: "localeString" }],
      description:
        "Please list all days (mostly holidays) of the year the museum is closed.",
    },
    {
      name: "additionalInfo",
      title: "Additional Information",
      type: "localePortableText",
      description:
        "If there is more information that guests need to know about museum hours that does not fit into any of the above fields, please include it here.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: HOURS_TITLE,
      };
    },
  },
};

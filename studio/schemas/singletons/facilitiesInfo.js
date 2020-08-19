const FACILITIES_INFO_TITLE = "Facilities Information";

export default {
  name: "facilitiesInfo",
  title: FACILITIES_INFO_TITLE, // might want to update this
  type: "document",
  fields: [
    {
      name: "location",
      title: "Wing Luke Building Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hours",
      title: "Building Hours",
      description: "Give details for when the museum is open.",
      type: "localePortableText",
    },
  ],
  preview: {
    prepare() {
      return {
        title: FACILITIES_INFO_TITLE,
      };
    },
  },
};

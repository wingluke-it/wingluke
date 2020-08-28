const VISITOR_GUIDE_TITLE = "Visitor Guide";

export default {
  name: "visitorGuide",
  title: VISITOR_GUIDE_TITLE, // might want to update this
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
    // TODO array of ticket object type
    {
      name: "directions",
      title: "Directions to the Museum",
      type: "localePortableText",
    },
    {
      name: "parkingInfo",
      title: "Parking Information",
      type: "localePortableText",
    },
  ],
  preview: {
    prepare() {
      return {
        title: VISITOR_GUIDE_TITLE,
      };
    },
  },
};

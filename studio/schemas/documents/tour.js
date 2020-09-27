export default {
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "localePortableText",
      description:
        "Please provide a short (3-5 sentence) description of this tour.",
      // TODO required?
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this tour.",
    },
    {
      name: "isPublic",
      title: "Is Open to the Public",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "True if this tour is open to the public on a set schedule (e.g. Historic Hotel Tour, CDT, etc.)",
    },
    // TODO add validation such that schedulingInfo is requried if isPublic is true
    {
      name: "schedulingInfo",
      title: "Public Schedule",
      type: "schedulingInfo",
      description:
        "If this is a public tour that occurs on a set schedule, provide details for when and how often this tour occurs. (This enables this tour to show up on the website calendar).", // TODO provide example, such as HHT or CDT
      options: {
        collapsible: true,
      },
    },
    {
      name: "isPrivate",
      title: "Can Be Privately Scheduled",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "True if this tour can be scheduled privately by educators, families, business groups, etc.",
    },
    {
      name: "schedulingContact",
      title: "Scheduling Contact",
      type: "localePortableText",
      options: {
        collapsible: true,
      },
      description:
        "If this tour can be privately booked, please provide contact details (e.g. 'If you would like to schedule a private tour for your family, business, or school group, contact tours@wingluke.org or 206.623.5124 ext 133').",
    },
    {
      name: "recommendedGradeRange",
      title: "Recommended Grade Range",
      type: "localeString",
      description: "e.g. 6th grade and up",
    },
    {
      name: "goesOffsite",
      title: "Goes Offsite",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "True if this tour goes to locations outside of museum facilities.",
    },
    {
      name: "locationsVisited",
      title: "Locations Visited",
      type: "array",
      of: [{ type: "geopoint" }], // TODO should this just be a list of string? How to display geopoints in list form on the front end? geopoints also don't display in a pretty way in Sanity (just lat/lon)
      description:
        "If this is an offsite tour, please provide all locations that this tour will visit.",
    },
    {
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      description: "Provide how long this tour lasts in minutes.",
      validation: (Rule) => Rule.positive(),
    },
    {
      name: "walkingDistance",
      title: "Walking Distance (miles)",
      type: "number",
      description:
        "Provide the distance in miles tourists will need to walk on this tour.",
      validation: (Rule) => Rule.positive(),
    },
    {
      name: "accessibilityInfo",
      title: "Accessibility Info",
      type: "localeText",
      description:
        "Provide details about accessibility concerns (e.g. wheelchair accessibility, visual/hearing impairment accessibility, dietary restrictions for food tours, etc.) for this tour.",
    },
    // {
    //   name: "educationGuides",
    //   title: "Tour/Education Guides",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "individual" }] }],
    // },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
      media: "banner",
    },
  },
};

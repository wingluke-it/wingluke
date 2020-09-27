export default {
  name: "exhibit",
  title: "Exhibit",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this exhibit",
    },
    {
      name: "exhibitTypes",
      title: "Exhibit Type(s)",
      type: "array",
      options: {
        list: [
          { value: "ongoing", title: "Ongoing" },
          { value: "permanent", title: "Permanent" },
          { value: "traveling", title: "Traveling" },
          { value: "online", title: "Online" },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description:
        "Provide a short (3-5 sentence) description of this exhibit.",
      // TODO validation: required?
    },
    // TODO rename to Online Preview
    {
      name: "teaser",
      title: "Teaser Content",
      type: "localePortableText",
      description: "Provide teaser content for this exhibit.",
      // TODO validation: required?
    },
    {
      name: "content",
      title: "Full Content",
      type: "localePortableText",
      description:
        "If this is a fully online exhibit, provide full content for this exhibit.",
      // TODO validation: required?
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "reference",
      to: [{ type: "gallery" }],
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
      // TODO description...what types of images are in this field?
    },
    {
      // TODO delete? is this redundant with schedulingInfo's Start Date and Time and End Date and Time?
      name: "openingDate",
      title: "Opening Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-YYYY",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      // TODO delete? is this redundant with schedulingInfo's Start Date and Time and End Date and Time?
      name: "closingDate",
      title: "Closing Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-YYYY",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "schedulingInfo",
      title: "Scheduling Info",
      type: "schedulingInfo",
      options: {
        collapsible: true,
      },
      description:
        "Fill out these fields to specify which dates and times this exhibit will be open to the public.",
    },
    {
      name: "createdBy",
      title: "Created By",
      type: "reference",
      to: [{ type: "youthProgramSession" }],
      description:
        "Choose the corresponding youth program session or CAC that created this exhibit.",
    },
    {
      name: "creationProcess",
      title: "Creation Process",
      type: "reference",
      to: [{ type: "youthProgram" }],
    },
    // cac members can be inferred from the referenced program
    /*     {
      name: "cacMembers",
      title: "CAC Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "individual" }] }],
    }, */
    {
      name: "wingDonors",
      title: "The Wing Donors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }], // TODO and type: person?
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "presentingSeasonSponsors",
      title: "Presenting Season Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "leadSponsors",
      title: "Lead Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "primeSponsors",
      title: "Prime Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "majorSponsors",
      title: "Major Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "supportingSponsors",
      title: "Supporting Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      fieldset: "sponsors",
    },
    {
      name: "relatedExhibits",
      title: "Related Exhibits",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
    },
    {
      name: "exhibitOpening",
      title: "Exhibit Opening",
      type: "reference",
      to: [{ type: "event" }],
    },
    {
      name: "otherRelatedEvents",
      title: "Other Related Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    },
    // TODO related tours?
    // TODO related stories?
    // TODO array of artifact references?
    // location (for traveling exhibits)
  ],
  fieldsets: [
    {
      name: "sponsors",
      title: "Sponsors",
      options: {
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "overview.en",
      media: "banner",
    },
  },
};

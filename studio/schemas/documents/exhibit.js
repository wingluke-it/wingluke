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
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this exhibit's web page",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description: "Provide a short (3-5 sentence) overview of this exhibit.",
      // TODO validation: required?
    },
    // TODO Is this field necessary?
    /*     {
      name: "description",
      title: "Description",
      type: "localePortableText",
      description: "Provide a more detailed description of this exhibit.",
      // TODO validation: required?
    }, */
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this exhibit",
    },
    // TODO what purpose does this serve beyond the Overview and image gallery? check in with Shaun if this field is necessary
    /*     {
      name: "teaserContent",
      title: "Teaser Content",
      type: "localePortableText",
      description: "Provide teaser/preview content for this exhibit.",
    }, */
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
      name: "featuredArtists",
      title: "Featured Artists",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    },
    {
      name: "featuredCollectionItems",
      title: "Featured Collection Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collectionItem" }] }],
    },
    {
      name: "featuredOralHistories",
      title: "Featured Oral Histories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "oralHistory" }] }],
    },
    {
      name: "exhibitTypes",
      title: "Exhibit Type(s)",
      type: "array",
      options: {
        list: [
          // { value: "permanent", title: "Permanent" }, // interview said this label isn't necessary...?
          { value: "upcoming", title: "Upcoming" }, // should this be automatically inferred from the Opening Date?
          { value: "current", title: "Current" }, // should this be automatically inferred from the Opening and Closing Date? ongoing exhibits might not have a closing date
          { value: "past", title: "Past" }, // should this be automatically inferred from the Closing Date?
          // { value: "archived", title: "Archived" },
          { value: "ongoing", title: "Ongoing" },
          { value: "permanent", title: "Permanent" },
          { value: "temporary", title: "Temporary" },
          { value: "traveling", title: "Traveling" },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "openingDate",
      title: "Opening Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "closingDate",
      title: "Closing Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "reference",
      to: [{ type: "gallery" }],
    },
    {
      name: "travelingLocation",
      title: "Current Location",
      type: "location", //"geopoint",
      fieldset: "traveling",
    },
    {
      name: "pastLocations",
      title: "Past Locations",
      type: "array",
      of: [{ type: "location" }],
      fieldset: "traveling",
    },
    {
      name: "exhibitOpening",
      title: "Exhibit Opening",
      type: "reference",
      to: [{ type: "event" }],
      description:
        "Please select the Event that is the opening reception for this exhibit. If one does not yet exist in Sanity, please create one.",
    },
    // events (not including exhibit opening) relationship is represented in event document schema under Related Exhibits fields
    /* {
      name: "otherRelatedEvents",
      title: "Other Related Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }, */
    {
      name: "curatedBy",
      title: "Curated By",
      type: "reference",
      to: [{ type: "youthProgramSession" }, { type: "cacProcess" }],
      description:
        'Choose either "CAC Process" or the corresponding youth program session that curated this exhibit.',
    },
    // Youth Program Participants can be inferred from the youth program session referenced in the curatedBy field
    {
      name: "cacMembers",
      title: "Community Advisory Committee Participants",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "creditPanel",
    },
    // creation process can be inferred from curatedBy field...e.g. if this exhibit was created by TeensWay Winter 2020,
    // it can be inferred that this exhibit was created by the TeensWay youth program
    /*     {
      name: "creationProcess",
      title: "Creation Process",
      type: "reference",
      to: [{ type: "youthProgram" }, { type: "cacProcess" }],
    }, */
    {
      name: "exhibitWriters",
      title: "Exhibit Writers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      fieldset: "creditPanel",
    },
    {
      name: "exhibitDesigners",
      title: "Exhibit Designers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      fieldset: "creditPanel",
    },
    // TODO related tours?
    // TODO related blog posts?

    // TODO lots of duplicated code below...maybe factor these out into schemaGlobals and use SPONSOR_LEVELS.map() to generate
    // the below fields. Or at the very least extract into a reusable sponsor panel object
    // TODO find an easy way for Julie to add/change sponsor levels...maybe make a document type for sponsor level?
    // maybe make an object sponsorGroup that has a sponsorLevel or string field and an array of reference to sponsors field
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
      name: "seasonSponsors",
      title: "Season Sponsors",
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
      name: "partnerSponsors",
      title: "Partner Sponsors",
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
      name: "friendSponsors",
      title: "Friend Sponsors",
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
  ],
  fieldsets: [
    {
      name: "sponsors",
      title: "Sponsors",
      options: {
        collapsible: true,
      },
    },
    {
      name: "traveling",
      title: "Traveling Exhibit Details",
      options: {
        collapsible: true,
      },
    },
    {
      name: "creditPanel",
      title: "Credit Panel",
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

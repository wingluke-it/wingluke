import { referenceDescription } from "../schemaGlobals";

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
      name: "subtitle",
      title: "Subtitle",
      type: "localeString",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this exhibit's web page. Use the 'Generate' button to set it to a unique ID based on the Title field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "openingDate",
      title: "Opening Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "closingDate",
      title: "Closing Date",
      type: "date",
      description:
        "Please provide the last day this exhibit will be open to visitors (not the first day that it is closed). Leave blank if this exhibit is always on view (permanent or ongoing)",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    {
      name: "specialCategory",
      title: "Special Category",
      description:
        "If a special category is set, this exhibit will not be categorized based on its opening and closing dates.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { value: "traveling", title: "Traveling" },
          { value: "virtual", title: "Virtual (online-only)" },
          { value: "past", title: "Past (dates unknown)" },
          { value: "upcoming", title: "Upcoming (opening date TBA)" },
          { value: "nowOnView", title: "Now On View (closing date TBA)" },
          {
            value: "alwaysOnView",
            title: "Always On View (opening date unknown)",
          },
          { value: "none", title: "No Special Category" },
          // { value: "upcoming", title: "Upcoming" }, // should this be automatically inferred from the Opening Date?
          // { value: "current", title: "Current" }, // should this be automatically inferred from the Opening and Closing Date? ongoing exhibits might not have a closing date
          // { value: "past", title: "Past" }, // should this be automatically inferred from the Closing Date?
          // { value: "archived", title: "Archived" },
          // { value: "ongoing", title: "Ongoing" }, // change to "always on view"?
          // { value: "alwaysOnView", title: "Always On View" },
          // { value: "permanent", title: "Permanent" }, // interview said this label isn't necessary...?
          // { value: "temporary", title: "Temporary" },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "reference",
      to: [{ type: "gallery" }],
      description: referenceDescription("gallery"),
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
      name: "curatedBy",
      title: "Curated By",
      type: "reference",
      to: [{ type: "youthProgramSession" }, { type: "cacProcess" }],
      description:
        'Choose either "CAC Process" or the corresponding youth program session that curated this exhibit. ' +
        referenceDescription("youth program session"),
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description:
        "Provide a banner image for this exhibit. The website will always present a 4:1 aspect ratio, so upload a panorama image and/or edit the crop and hotspot accordingly.",
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
      description: referenceDescription("artist"),
    },
    {
      name: "virtualExhibitLink",
      title: "Virtual Exhibit Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "If this is a virtual (online-only) exhibit, please provide the URL to the webpage where it can be viewed. Otherwise, leave blank.",
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
      name: "rentalPricing",
      title: "Rental Pricing",
      type: "localeText",
      fieldset: "traveling",
    },
    {
      name: "additionalRequirements",
      title: "Additional Requirements",
      type: "localeText",
      fieldset: "traveling",
    },
    {
      name: "exhibitOpening",
      title: "Exhibit Opening",
      type: "reference",
      to: [{ type: "event" }],
      description:
        "Please select the Event that is the opening reception for this exhibit. " +
        referenceDescription("event"),
    },
    // events (not including exhibit opening) relationship is represented in event document schema under Related Exhibits fields
    /* {
      name: "otherRelatedEvents",
      title: "Other Related Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }, */
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
      description: referenceDescription("artist"),
    },
    {
      name: "exhibitDesigners",
      title: "Exhibit Designers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      fieldset: "creditPanel",
      description: referenceDescription("artist"),
    },
    /*     {
      name: "wingDonors",
      title: "The Wing Donors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }], // TODO and type: person?
        },
      ],
      fieldset: "creditPanel",
    }, */
    {
      name: "sponsors",
      title: "Sponsors",
      type: "sponsorList",
      options: {
        collapsible: true,
      },
    },
    {
      name: "featuredCollectionItems",
      title: "Featured Collection Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collectionItem" }] }],
      description: referenceDescription("collection item"),
    },
    {
      name: "featuredOralHistories",
      title: "Featured Oral Histories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "oralHistory" }] }],
      description: referenceDescription("oral history"),
    },
    // TODO related tours?
    // TODO related blog posts?
    /*     {
      name: "relatedExhibits",
      title: "Related Exhibits",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
    }, */
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
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (
        fields &&
        fields.openingDate &&
        fields.closingDate &&
        new Date(fields.closingDate) < new Date(fields.openingDate)
      ) {
        return "Opening Date must be earlier than Closing Date";
      }

      return true;
    }),
  preview: {
    select: {
      title: "title.en",
      subtitle: "subtitle.en",
      media: "banner",
    },
  },
};

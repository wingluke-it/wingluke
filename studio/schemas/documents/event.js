import { referenceDescription } from "../schemaGlobals";

// hopefully this won't be a problem that this is called event.js given that event is a special word in JS
export default {
  name: "event",
  title: "Event",
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
        "A slug is the identifying part of the URL of this event's web page. Once this is set on a published, public page, do not change it.",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "localePortableText",
      description: "Provide a short (3-5 sentence) description of this event.",
    },
    {
      // TODO should this be changed or separated into event audience?
      name: "eventTags",
      title: "Event Tags",
      type: "array",
      options: {
        list: [
          { value: "communityProgram", title: "Community/Public Programming" },
          { value: "donorEvent", title: "Donor Event" },
          { value: "memberOnly", title: "Member-Only" },
          {
            value: "tatuechi",
            title: "Supported by the Tatuechi Story Theatre",
          },
          {
            value: "nonWing",
            title: "Non-Wing Event (promoted, but not planned, by the Wing)",
          },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "scheduleType",
      title: "Schedule Type",
      type: "string",
      options: {
        list: [
          {
            title:
              "Finite Event Occurrences (this event only occurs on a single date or on a finite number of specific dates - e.g. APA Santa 2020 or a 3-day educator training)",
            value: "finite",
          },
          {
            // TODO add another example
            title:
              "Repeating Event Occurrences (this event runs on a set schedule and has many occurrences - e.g. Free Admission on First Thursdays)",
            value: "repeating",
          },
        ],
        layout: "radio",
      },
      fieldset: "schedule",
    },
    {
      name: "finiteOccurrences",
      title: "Finite Event Occurrences Details",
      type: "eventOccurrences",
      options: {
        collapsible: true,
      },
      description:
        "If this event occurs on a finite number of specific dates, please add all such occurrences here.",
      fieldset: "schedule",
      // TODO validation (may need to be document-level validation) include instructions: "please click dropdown arrow"
    },
    {
      name: "repeatingOccurrences",
      title: "Repeating Event Occurrences Details",
      type: "schedulingInfo",
      options: {
        collapsible: true,
      },
      description:
        "If this event runs on a repeating schedule, please provide details for that schedule here.",
      fieldset: "schedule",
      // TODO validation (may need to be document-level validation)
    },
    {
      name: "scheduleDetails",
      title: "Schedule Details",
      description:
        "(Optional) Provide any additional details about this event's schedule here.",
      type: "string",
      fieldset: "schedule",
    },
    {
      name: "isOnline",
      title: "Is Online Event",
      type: "boolean",
    },
    {
      name: "loc",
      title: "Location",
      type: "location",
      description:
        "These details should NOT be provided if this is an online event.",
      // TODO should this only be enabled if this event is not an online-only event?
    },
    {
      name: "admittanceType",
      title: "Admittance Type",
      type: "string",
      options: {
        list: [
          {
            value: "freeNoReg",
            title: "Free (no registration required)",
          },
          {
            value: "freeWithReg",
            title: "Free with Registration",
          },
          {
            value: "ticketPurchaseRequired",
            title: "Ticket Purchase Required",
          },
        ],
        layout: "radio",
      },
    },
    {
      name: "streamLink",
      title: "Stream Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Provide a link to where attendees for this event can stream it.",
    },
    {
      name: "ticketingLink",
      title: "Ticketing Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Provide a link to where attendees for this event can register and/or purchase tickets.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this event",
    },
    {
      name: "pricingDetails",
      title: "Pricing Details",
      type: "localePortableText",
      description: "Please provide pricing details for this event.",
    },
    {
      name: "fbEvent",
      title: "Facebook Event",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description: "Provide a link to the corresponding Facebook event.",
    },
    {
      name: "flier",
      title: "Flier",
      type: "figure",
      description:
        "Provide a flier image for this event. A flier image typically includes text details of the event overlayed on the image.",
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
      description: "Please provide promotional images for this event.",
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
      description:
        "Please provide the maximum number of people that can attend this event.",
      validation: (Rule) => Rule.integer().positive(),
    },
    {
      name: "featuredArtists",
      title: "Featured Artists",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      description: referenceDescription("artist"),
    },
    {
      name: "departments",
      title: "Collaborating Departments",
      description:
        "Please provide all departments that were involved in the planning of this event. " +
        referenceDescription("department"),
      type: "array",
      of: [{ type: "reference", to: [{ type: "department" }] }],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: "accessibilityInfo",
      title: "Accessibility Info",
      type: "localePortableText",
      description:
        "Provide details about accessibility concerns (e.g. wheelchair accessibility, visual/hearing impairment accessibility, dietary restrictions for food provided, etc.) for this event.",
    },
    {
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      of: [{ type: "faq" }],
    },
    {
      name: "collabingPartners",
      title: "Collaborating Community Partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "communityPartner" }] }],
      description:
        "Please provide all community partners that helped to plan and/or run this event. " +
        referenceDescription("community partner"),
    },
    // TODO should there be another array field for volunteering community partners?
    {
      name: "sponsors",
      title: "Sponsors",
      type: "sponsorList",
      options: {
        collapsible: true,
      },
    },
    {
      name: "relatedEvents",
      title: "Related Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      description: referenceDescription("event"),
    },
    {
      name: "relatedExhibits",
      title: "Related Exhibits",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
      description:
        "If this event was planned in order to support a specific exhibit, please list it here. " +
        referenceDescription("exhibit"),
    },
  ],
  fieldsets: [
    {
      name: "schedule",
      title: "Schedule",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (
        fields &&
        fields.admittanceType === "freeWithReg" &&
        !fields.ticketingLink
      ) {
        return 'A ticketing link must be provided because this event is set to the admittance type "Free with Registration".';
      }

      if (
        fields &&
        fields.admittanceType === "ticketPurchaseRequired" &&
        !fields.ticketingLink
      ) {
        return 'A ticketing link must be provided because this event is set to the admittance type "Ticket Purchase Required".';
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

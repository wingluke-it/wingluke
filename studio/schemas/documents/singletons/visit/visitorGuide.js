import { EMAIL_REGEX, PHONE_REGEX } from "../../../schemaGlobals";
const VISITOR_GUIDE_TITLE = "Visitor Guide";

export default {
  name: "visitorGuide",
  title: VISITOR_GUIDE_TITLE, // might want to update this
  type: "document",
  fields: [
    {
      name: "visitEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
      // fieldset: "contactInfo",
    },
    {
      name: "visitPhone",
      title: "Contact Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).error("The required phone format is '123-456-7890 x123'"),
      // fieldset: "contactInfo",
    },
    {
      // TODO add a list of days of the week field as well as two time fields?
      name: "hours",
      title: "Building Hours",
      type: "localeText",
      // rows: 3, // this only works with text fields (not localeText)
      description:
        "Please provide the hours the museum is open in a typical week (e.g. '10 AM - 5 PM, Tuesday - Sunday').",
      fieldset: "before",
    },
    {
      name: "daysClosed",
      title: "Days of the Year Closed",
      type: "array",
      of: [{ type: "localeString" }],
      description:
        "Please list all days (mostly holidays) of the year the museum is closed.",
      fieldset: "before",
    },
    {
      name: "loc",
      title: "Wing Luke Building Location",
      type: "location",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "museumMapPDF",
      title: "Museum Map PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      fieldset: "during",
    },
    {
      name: "neighborhoodMapPDF",
      title: "Neighborhood Map PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      fieldset: "during",
    },
    {
      name: "blGravesitePDF",
      title: "Bruce Lee's Gravesite PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
    {
      name: "accessibilityInfo",
      title: "Accessibility Information",
      type: "localePortableText",
      description:
        "Please provide as much information as possible for individuals with disabilities who are considering visiting the museum.",
      fieldset: "during",
    },
    {
      name: "drivingDirections",
      title: "Driving Directions to the Museum",
      type: "localePortableText",
      fieldset: "before",
    },
    {
      name: "parkingInfo",
      title: "Parking Information",
      type: "localePortableText",
      fieldset: "before",
    },
    {
      name: "parkingMap",
      title: "Parking Map PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      fieldset: "before",
    },
    {
      name: "publicTransitDirections",
      title: "Public Transit Directions to the Museum",
      type: "localePortableText",
      fieldset: "before",
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about visiting the museum.",
    },
    {
      name: "procedures",
      title: "Visitor Guidelines and Procedures",
      type: "localePortableText",
      description:
        "If there are special procedures in place for visiting the museum (e.g. during COVID-19), please describe them here.",
      fieldset: "during",
    },
    {
      name: "additionalInfo",
      title: "Additional Information",
      type: "localePortableText",
      description:
        "If there is more information that guests need to know about visiting the museum that does not fit into any of the above fields, please include it here.",
    },
    {
      name: "additionalFiles",
      title: "Additional Files and Maps",
      type: "array",
      of: [
        {
          type: "fileWithMetadata",
        },
      ],
    },
  ],
  fieldsets: [
    {
      name: "before",
      title: "Plan Your Visit",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "during",
      title: "During Your Visit",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "after",
      title: "After Your Visit",
      options: {
        collapsible: true,
        collapsed: false,
      },
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

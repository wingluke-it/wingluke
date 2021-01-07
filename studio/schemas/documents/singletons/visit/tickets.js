const TICKETS_TITLE = "Tickets";

export default {
  name: "tickets",
  title: TICKETS_TITLE,
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
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "ticketPurchaseLink",
      title: "General Admission Ticket Purchase Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "Please provide the link for where visitors can purchase general admission tickets in advance of their visit to the museum.",
      fieldset: "ga",
    },
    {
      name: "ticketTypes",
      title: "General Admission Ticket Types",
      type: "array",
      of: [{ type: "ticketType" }],
      fieldset: "ga",
    },
    {
      name: "gaInfo",
      title: "General Admission Information",
      type: "localePortableText",
      fieldset: "ga",
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faq" }],
      description:
        "Please provide answers to frequently asked questions about purchasing general admission.",
    },
    {
      name: "additionalInfo",
      title: "Additional Information",
      type: "localePortableText",
      description:
        "If there is more information that guests need to know about tickets that does not fit into any of the above fields, please include it here.",
    },
  ],
  fieldsets: [
    {
      name: "ga",
      title: "General Admission",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: TICKETS_TITLE,
      };
    },
  },
};

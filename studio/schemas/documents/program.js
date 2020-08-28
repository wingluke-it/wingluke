// this is not called event.js because event is a special word in JS
export default {
  name: "program",
  title: "Program/Event", // Might be better to just stick with either "Event" or "Program"
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "localePortableText",
      description: "Provide a short (3-5 sentence) description of this event.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this program",
    },
    {
      name: "programTypes",
      title: "Program Type(s)",
      type: "array",
      options: {
        list: [
          { value: "onlineProgram", title: "Online Exclusive" },
          { value: "wingProgram", title: "Wing Program" },
          { value: "communityProgram", title: "Community Program" },
          { value: "memberDonorProgram", title: "Member + Donor Program" },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
      // TODO should this only be enabled if this program is not an online-only program?
    },
    {
      name: "schedulingInfo",
      title: "Scheduling Info",
      type: "schedulingInfo",
    },
    {
      name: "rsvpLink",
      title: "RSVP Link",
      type: "url",
      description:
        "Provide a link to where attendees for this program can RSVP.",
    },
    {
      name: "streamLink",
      title: "Stream Link",
      type: "url",
      description:
        "Provide a link to where attendees for this program can stream it.",
    },
    {
      name: "fbEvent",
      title: "Facebook Event",
      type: "url",
      description: "Provide a link to the corresponding Facebook event.",
    },
    {
      name: "relatedPrograms",
      title: "Related Programs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "program" }] }],
    },
    {
      name: "relatedExhibits",
      title: "Related Exhibits",
      type: "array",
      of: [{ type: "reference", to: [{ type: "exhibit" }] }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
      media: "banner",
    },
  },
};

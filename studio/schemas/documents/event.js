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
      name: "description",
      title: "Description",
      type: "localePortableText",
      description: "Provide a short (3-5 sentence) description of this event.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this event",
    },
    {
      name: "eventTypes",
      title: "Event Type(s)",
      type: "array",
      options: {
        list: [
          { value: "onlineEvent", title: "Online Exclusive" },
          { value: "wingEvent", title: "Wing Event" },
          { value: "communityEvent", title: "Community Event" },
          { value: "memberEvent", title: "Donor Event" },
          { value: "donorEvent", title: "Member Event" },
        ],
      },
      of: [{ type: "string" }],
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
      // TODO should this only be enabled if this event is not an online-only event?
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
      description: "Provide a link to where attendees for this event can RSVP.",
    },
    {
      name: "streamLink",
      title: "Stream Link",
      type: "url",
      description:
        "Provide a link to where attendees for this event can stream it.",
    },
    {
      name: "fbEvent",
      title: "Facebook Event",
      type: "url",
      description: "Provide a link to the corresponding Facebook event.",
    },
    {
      name: "relatedEvents",
      title: "Related Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
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

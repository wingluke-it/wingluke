export default {
  name: "sponsorList",
  title: "Sponsor List",
  type: "object",
  fields: [
    // TODO lots of duplicated code below...maybe factor these out into schemaGlobals and use SPONSOR_LEVELS.map() to generate
    // the below fields.
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
    },
    {
      name: "mediaSponsors",
      title: "Media Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
    },
  ],
};
